import { IsInt, IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CreateShowtimeDto {

    @IsDateString()
    showDate: Date;

    @IsDateString()
    startTime: Date;

    @IsDateString()
    endTime: Date;
}
