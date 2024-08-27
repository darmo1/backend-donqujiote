import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class SearchPropertyDto {
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsString()
  city: string;

  @Transform(({ value }) => value === '' ? undefined : value)
  @IsString()
  @IsOptional()
  property?: string;

  @Transform(({ value }) => value === '' ? undefined : value)
  @IsNumber()
  @IsOptional()
  rooms?: string;


}