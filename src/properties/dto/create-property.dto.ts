import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePropertyDto {


  @IsString()
  type: string;

  @IsString()
  description: string

  @IsString()
  address: string;

  @IsNumber()
  @IsOptional()
  price?: number
  
  @IsOptional()
  images?: Express.Multer.File;

  @IsOptional()
  available?: boolean
}
