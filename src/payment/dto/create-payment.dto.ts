import { Seat, PaymentMethod } from "@prisma/index";
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreatePaymentDto {

    @IsNotEmpty()
    @IsString() // 
    paymentMethod: PaymentMethod

    @IsArray()
    @IsNumber()
    Seats: Seat[]

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    totalAmount: number
}


