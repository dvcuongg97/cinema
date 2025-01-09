import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from 'src/validations/validation.service';
import { CreateSeatDto } from 'src/seat/dto/create-seat.dto';
import { ShowtimeService } from 'src/showtime/showtime.service';

@Injectable()
export class SeatService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly showtinme: ShowtimeService
  ) { }

  // create
  async create(showtime_id: string, createSeatDto: CreateSeatDto) {


    const rs = await this.emptyNumber(createSeatDto.seatNumber)
    if (rs) throw new BadRequestException('Seat Number Already Exists')

    const newSeat = await this.prisma.seat.create({
      data: {
        ...createSeatDto,
        // showtime_id
      }
    });
    return newSeat;
  }

  async update(
    showtime_id: string,
    updateSeatDto: UpdateSeatDto
  ) {
    ///////////
    const showtime = await this.showtinme.isExists(showtime_id)
    if (!showtime) throw new BadRequestException('Showtime Not Found')

    const empty = await this.emptyNumber(updateSeatDto.seatNumber)
    if (empty) throw new BadRequestException('Seat Number Already Exists')

    const update = {
      seatRow: updateSeatDto.seatRow,
      seatNumber: updateSeatDto.seatNumber,
      type: updateSeatDto.type,
      price: updateSeatDto.price,
      status: updateSeatDto.status,
    }

    const newSeat = await this.prisma.seat.create({
      data: update
      // data : updateSeatDto
    });
    return newSeat;
  }

  async remove(seatNumber: number) {
    const removed = await this.prisma.seat.delete({ where: { seatNumber } })
    return removed ? true : null
  }

  /// common
  async emptyNumber(seatNumber: number) {
    return await this.prisma.seat.count({ where: { seatNumber } })
  }
}
