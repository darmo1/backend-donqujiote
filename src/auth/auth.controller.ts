import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/auth.entity';
import { RawHeaders, GetUser, Auth, RoleProtected } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }

  @Get('check-auth-status')
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user); //mandamos el id del user, o email  para validar y enviar un nuevo token
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User) {
    return {
      ...user,
      isUserLogged: true,
    };
  }

  //For private routes
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(@GetUser() user: User) {
    return {
      ok: true,
      message: 'Hello Private Route',
      user,
    };
  }

  @Get('private-email')
  @UseGuards(AuthGuard())
  testingPrivateRouteEmail(@GetUser(['email']) userEmail: string) {
    return {
      ok: true,
      message: 'Hello Private Route',
      userEmail,
    };
  }

  @Get('private-rowHeader')
  @UseGuards(AuthGuard())
  testingPrivateRouteRowHeader(
    @RawHeaders() rowHeader: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Hello Private Route',
      rowHeader,
      headers,
    };
  }

  @Get('private-2')
  @SetMetadata('roles', ['admin', 'super-admin']) //sirve para añadir info extra al controlador
  @UseGuards(AuthGuard(), UserRoleGuard) //UseRoleGuar se creo un guard desde nest g guard
  privateRouter2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  //usando roleProtected

  @Get('private-3')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRouter3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private-4')
  @Auth()
  privateRouter4(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
