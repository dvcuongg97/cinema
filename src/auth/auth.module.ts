import { Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constant';
import { JwtStrategy } from 'src/guards/passport/jwt.strategy';

const { Module } = require('@nestjs/common');

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET_KEY'),
    //     signOptions: {
    //       expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') || '1h',
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
