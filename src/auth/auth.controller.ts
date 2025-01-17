import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from 'src/guards/passport/jwt.guard';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  // @UseGuards(JwtAuthGuard)
  async signIn(@Body() dto: { email: string; password: string }) {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async signOut() {
    this.authService.signOut();
  }
}
