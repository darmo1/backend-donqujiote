import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [ConfigModule],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryProvider],
  exports: [FilesService]
})
export class FilesModule {}
