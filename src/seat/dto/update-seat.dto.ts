import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatDto } from './create-seat.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSeatDto extends PartialType(CreateSeatDto) { }
