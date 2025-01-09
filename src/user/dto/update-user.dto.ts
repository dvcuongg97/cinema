import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @Min(3)
    name?: string

    @IsEmail()
    email?: string

    @IsString()
    @Min(6)
    password?: string

    @IsString()
    phoneNumber?: string
}
