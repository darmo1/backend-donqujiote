import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, UploadedFiles, Param, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SearchPropertyDto } from './dto/search-property.dto';

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

  @Post('search')
  async searchProperty(
    @Body() searchProperty: SearchPropertyDto
  ){
   return await this.propertiesService.searchProperty(searchProperty)
  }

  @Get('menuProperties')
  async findMenuProperties(){
   return await this.propertiesService.findMenuProperties()
  }


  @Get(':id')
  async findproperty(
    @Param('id') id: string,
    @Query('city') city?: string
  ){
    const decodedCity = city ? decodeURIComponent(city) : null;
    return this.propertiesService.findProperties(id, decodedCity)
  }

  
  @Get('/suggestions/:suggestionBy')
  async findpropertySuggested(
    @Param('suggestionBy') suggestionBy: string,
  ){
console.log({ suggestionBy })
    return this.propertiesService.findPropertiesSuggestedByCity(suggestionBy)
  }

  @Get()
  async findAll(){
    return this.propertiesService.findAllProperties()
  }


  
  // @Post('create')
  // @UseInterceptors(FileInterceptor('images'))
  // async create(
  //   @UploadedFile() images: Express.Multer.File,
  //   @Body() createPropertyDto: CreatePropertyDto,
  // ) {
  //   return this.propertiesService.create(createPropertyDto, images);
  // }
}
