import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product:/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);

    return res.sendFile(path);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('images', {
      fileFilter,
      // limits: { fileSize: 10000 },
      // storage: diskStorage({
      //   destination: '../../static/uploads',
      //   filename: fileNamer,
      // }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log( ' entró por aqui')
    if (!file)
      throw new BadRequestException('Make sure that the file is an image');
    // const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;
    // return { secureUrl };

    try{
      const secureUrl = await this.filesService.uploadImage(file);
  

    }catch(err){
      console.error({ err })
      throw new BadRequestException('Invalid file type. AQUI');
    }



  }
}
