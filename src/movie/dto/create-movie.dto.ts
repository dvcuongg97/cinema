import { MovieGenre } from "@prisma/index";
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateMovieDto {

  @IsString()
  title: string

  @IsString()
  genre: MovieGenre


  @IsString()
  description: string

  @IsString()
  language: string

  @IsString()
  trailer: string

  @IsString()
  image: string

  @IsInt()
  @Min(0)
  @Max(360) // Assuming maximum duration is 6 hours
  @IsOptional()
  duration?: number;

  @IsOptional()
  rating?: number;

}
