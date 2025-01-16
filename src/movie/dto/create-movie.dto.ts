import { Language } from "@prisma/index";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateMovieDto {

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  slug: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsEnum(Language)
  language: Language

  @IsString()
  trailer: string

  @IsString()
  image: string

  @IsInt()
  @Min(0)
  @Max(360) // Assuming maximum duration is 6 hours
  @IsOptional()
  duration?: number;

  // @IsOptional()
  // rating?: number;

}
