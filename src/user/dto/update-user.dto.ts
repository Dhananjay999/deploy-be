import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  FIRSTNAME?: string;

  @IsString()
  @IsOptional()
  LASTNAME?: string;

  @IsOptional()
  @IsEmail()
  EMAIL?: string;

  @IsString()
  @IsOptional()
  PASSWORD?: string;

  @IsOptional()
  @IsNumber()
  NUMBER?: number;
}
