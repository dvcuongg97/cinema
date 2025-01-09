import { Global, Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
  controllers: [SeatController],
  providers: [SeatService],
  exports: [SeatService]
})
export class SeatModule { }
