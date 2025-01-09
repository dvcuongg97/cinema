import { Global, Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';

@Global()
@Module({
  controllers: [CinemaController],
  providers: [CinemaService],
  exports: [CinemaService]
})
export class CinemaModule { }
