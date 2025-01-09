import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Post('create')
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return this.movieService.findAll(skip = 0, take = 3);
  }

  @Get(':title')
  findOne(@Param('title') title: string) {
    return this.movieService.findOne(title);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(updateMovieDto, id);
  }

  @Delete(':title')
  remove(@Param('title') title: string) {
    return this.movieService.remove(title);
  }
}
