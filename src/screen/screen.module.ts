import { Global, Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { CinemaService } from 'src/cinema/cinema.service';

@Global()
@Module({
  // imports: [CinemaService],
  controllers: [ScreenController],
  providers: [ScreenService],
  exports: [ScreenService],
})
export class ScreenModule { }
