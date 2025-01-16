import {
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import * as argon2 from "argon2";

import { AuthDto } from "./dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";


@Injectable()

export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private jwt: JwtService,
    ) { }

    // register
    async register(dto: AuthDto) {

        await this.userService.emailCheck(dto.email)

        const hashed = await argon2.hash(dto.password)
        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: hashed
            }
        })

        return newUser
    }

    // sign in
    async signIn(dto: AuthDto) {

        const usr = await this.validateUser(dto)

        const payload = {
            username: usr.email,
            sub: usr.userId,
            role: usr.role
        };
        const access_token = this.jwt.sign(payload)
        return { usr, access_token }
    }
    // sign out
    async signOut() {
        return 'sign out'
    }
    // validate
    async validateUser(dto: {
        email: string;
        password: string
    }): Promise<any> {
        // verify pw
        const usr = await this.prisma.user.findFirst({
            where: { email: dto.email }
        });
        //
        if (!usr) throw new UnauthorizedException()
        const pwMatch = await argon2.verify(
            usr.password,
            dto.password
        )
        //
        if (pwMatch) {
            const { password, ...result } = usr;
            return result;
        }
        return null;
    }

}