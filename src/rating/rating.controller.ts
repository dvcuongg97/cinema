import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) { }

  @Post(':movie_id')
  create(
    @Param('movie_id') movie_id: string,
    @Body() createRatingDto: CreateRatingDto
  ) {
    return this.ratingService.create(movie_id, createRatingDto);
  }

  @Get('/find-all/:movie_id')
  findAll(
    @Param('move_id') movie_id: string,
  ) {
    return this.ratingService.findAll(movie_id);
  }

  @Get('/avg-score/:movie_id')
  avgScore(@Param('movie_id') movie_id: string) {
    return this.ratingService.avgScore(movie_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete('/:movie_id/:user_id')
  remove(
    @Param('user_id') user_id: string,
    @Param('movie_id') movie_id: string
  ) {
    return this.ratingService.remove(user_id, movie_id);
  }
}

