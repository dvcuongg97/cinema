import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateCinemaDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    location: string

    @IsString()
    @IsNotEmpty()
    contactNumber: string

}

