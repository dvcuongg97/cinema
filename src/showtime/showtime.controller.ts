import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Controller('showtime')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) { }

  @Post('create/:movie_id/:screen_id')
  create(
    @Body() createShowtimeDto: CreateShowtimeDto,
    @Param('movie_id', new ParseUUIDPipe()) movie_id: string,
    @Param('screen_id', new ParseUUIDPipe()) screen_id: string,
  ) {
    return this.showtimeService.create(
      createShowtimeDto,
      movie_id,
      screen_id);
  }

  // @Get()
  // findAll() {
  //   return this.showtimeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.showtimeService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() dto: UpdateShowtimeDto
  ) {
    return this.showtimeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showtimeService.remove(id);
  }
}
