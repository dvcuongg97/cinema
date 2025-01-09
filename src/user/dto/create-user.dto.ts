import { IsEmail, IsString, Min } from "class-validator"

export class CreateUserDto {
    @IsString()
    @Min(3)
    name: string

    @IsEmail()
    email: string

    @IsString()
    @Min(6)
    password: string
}
