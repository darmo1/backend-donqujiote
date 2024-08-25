import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  price?: number;

  @IsOptional()
  images?: Array<Express.Multer.File>;

  @IsOptional()
  available?: boolean;

  @Transform(({ value }) => String(value))
  @IsString()
  departments: string;

  @Transform(({ value }) => String(value))
  @IsString()
  municipality: string;

  @IsString()
  location: string;

  @IsString()
  reference: string;

  @IsString()
  administration: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  area: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  socialClass: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  rooms: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  closet: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  garage: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  kitchen: number;

  @Transform(({ value }) => Number(value))
  @IsNumber(
    {},
    {
      message: 'Debe ser un numero',
    },
  )
  bathroom: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  dinningroom: number;
}
