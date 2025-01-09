import { SeatRow, SeatStatus, SeatType } from "@prisma/index";
import { IsEnum, IsInt, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateSeatDto {

    @IsEnum(SeatRow)
    @IsString()
    seatRow: SeatRow;

    @IsInt()
    @Min(1)
    @Max(10)
    seatNumber: number;

    @IsEnum(SeatType)
    type: SeatType;

    @IsNumber()
    @Min(0)
    price: number;

    @IsEnum(SeatStatus)
    status: SeatStatus;
}
