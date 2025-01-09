import { IsInt, IsString } from "class-validator";

export class CreateScreenDto {
    //
    @IsString()
    name: string

    @IsInt()
    capacity: number
}
