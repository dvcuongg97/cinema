import { PartialType } from '@nestjs/mapped-types';
import { CreateScreenDto } from './create-screen.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Seat, Showtime } from '@prisma/index';

export class UpdateScreenDto extends PartialType(CreateScreenDto) {

    // @IsString()
    // cinema_id: string

    @IsString()
    @IsOptional()
    name: string

    @IsOptional()
    @IsInt()
    capacity: number

    // @IsOptional()
    // Seats: Seat[]

    // @IsOptional()
    // Showtimes: Showtime[]

}
