import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MovieService } from 'src/movie/movie.service';

@Module({
  controllers: [RatingController],
  providers: [RatingService, MovieService],
})
export class RatingModule {}
