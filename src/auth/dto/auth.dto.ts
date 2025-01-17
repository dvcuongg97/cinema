import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class AuthDto {
  @IsString()
  // @Min(3)
  name: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  // @Min(6)
  password: string;
}
