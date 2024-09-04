import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";


export class ContactDto {

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  countryId: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  cellPhone: number;

  @IsOptional()
  @IsString()
  countryName: string;
}
