import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) { }

  @Post('create/:showtime_id')
  create(
    @Param('showtime_id', new ParseUUIDPipe()) showtime_id: string,
    @Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(showtime_id, createSeatDto);
  }

  // @Get()
  // findAll() {
  //   return this.seatService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.seatService.findOne(+id);
  // }

  @Patch('update/:showtime_id/:seat_id')
  update(
    @Param('showtime_id', new ParseUUIDPipe()) showtime_id: string,
    @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(showtime_id, updateSeatDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.seatService.remove(+id);
  }
}
