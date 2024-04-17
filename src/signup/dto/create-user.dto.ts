import { IsEmail, IsNumber, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  FIRSTNAME: string;

  @IsString()
  LASTNAME: string;

  @Matches(/^[\w-\.]+@(docquity)\.+(com)$/, {
    message: 'Only Docquity Members can login!',
  })
  @IsEmail()
  EMAIL: string;

  @Matches(
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,}$/,
    {
      message: 'Invalid Password Formate',
    },
  )
  @IsString()
  PASSWORD: string;

  @IsNumber()
  NUMBER: number;
}
