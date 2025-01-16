import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthDto } from "./dto/auth.dto";
import { LocalAuthGuard } from "src/guards/passport/local-auth.guard";



@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: AuthDto) {
        return this.authService.register(dto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto)
    }

    @Post('logout')
    async signOut() {
        this.authService.signOut()
    }
}