import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, UploadedFiles } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    return this.propertiesService.create(createPropertyDto, images);
  }

  // @Post('create')
  // @UseInterceptors(FileInterceptor('images'))
  // async create(
  //   @UploadedFile() images: Express.Multer.File,
  //   @Body() createPropertyDto: CreatePropertyDto,
  // ) {
  //   return this.propertiesService.create(createPropertyDto, images);
  // }

  @Get()
  async findAll(){
    return this.propertiesService.findAllProperties()
  }
}
