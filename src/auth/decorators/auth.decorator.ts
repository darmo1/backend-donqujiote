import { applyDecorators, UseGuards } from "@nestjs/common";
import { ValidRoles } from "../interfaces";
import { RoleProtected } from "./role-protected/role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";



export const Auth = ( ...roles: ValidRoles[]) => {

  return applyDecorators(
    //sin arrobas
    RoleProtected( ... roles ),
    UseGuards( AuthGuard(), UserRoleGuard )
  )

}