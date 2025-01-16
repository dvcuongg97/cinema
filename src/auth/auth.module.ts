import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/guards/passport/local-auth.guard";
import { LocalStrategy } from "src/guards/passport/local.strategy";
import { PrismaService } from "src/prisma/prisma.service";
// import { UserService } from "src/user/user.service";

const { Module } = require("@nestjs/common");

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60m' }
        }),
        PassportModule,

    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, LocalAuthGuard]
})

export class AuthModule { }

