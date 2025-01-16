import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRatingDto {

    // @IsNotEmpty()
    // @IsString()
    // movie_id: string

    @IsNotEmpty()
    @IsString()
    user_id: string

    @IsNotEmpty()
    @IsInt()
    score: number

}


