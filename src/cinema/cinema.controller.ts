import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) { }

  @Post('create')
  create(
    @Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.create(createCinemaDto);
  }

  @Get()
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get('find/:name')
  findOne(@Param('name') name: string) {
    return this.cinemaService.findOne(name);
  }

  @Patch('update/:name')
  update(@Param('name') name: string,
    @Body() payload: any) {
    return this.cinemaService.update(name, payload);
  }

  @Delete('delete/:name')
  remove(@Param('name') name: string) {
    return this.cinemaService.remove(name);
  }
}
