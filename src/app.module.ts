import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from 'src/auth/auth.module';
import { CinemaModule } from './cinema/cinema.module';
import { MovieModule } from './movie/movie.module';
import { ScreenModule } from './screen/screen.module';
import { SeatModule } from './seat/seat.module';
import { ShowtimeModule } from './showtime/showtime.module';

import { PrismaModule } from './prisma/prisma.module';
import { ValidationModule } from 'src/validations/validation.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MovieModule,
    CinemaModule,
    ScreenModule,
    SeatModule,
    ShowtimeModule,
    AuthModule,
    PrismaModule,
    ValidationModule,
    UserModule,
    PaymentModule,
    CloudinaryModule
  ],
})
export class AppModule { }
