import { Global, Module } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';

@Global()
@Module({
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
  exports: [ShowtimeService]
})
export class ShowtimeModule { }
