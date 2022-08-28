import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
