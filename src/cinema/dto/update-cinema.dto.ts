import { PartialType } from '@nestjs/mapped-types';
import { CreateCinemaDto } from './create-cinema.dto';
import { IsOptional, IsString } from 'class-validator';
import { Movie } from '@prisma/index';

//
export class UpdateCinemaDto extends PartialType(CreateCinemaDto) { }
