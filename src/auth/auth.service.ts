import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


import * as jwt from 'jsonwebtoken';

// dotenv.config();

@Injectable()
export class AuthService {
  //
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    // private jwt: JwtService,
  ) {}
  // register
  async register(dto: AuthDto) {
    await this.userService.emailCheck(dto.email);
    const hashed = await argon2.hash(dto.password);
    const newUser = await this.prisma.user.create({
      data: { ...dto, password: hashed },
    });
    return newUser;
  }

  // sign in
  async signIn({ email, password }) {
    const usr = await this.userService.validateUser(email, password);
    const payload = {
      // username: usr.email,
      email: usr.email,
      id: usr.id,
      role: usr.role,
    };
    // console.log('payload-jwt ::', payload);
    // console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

    // const access_token = this.jwt.sign(payload);
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return { user: usr, token };
  }

  // sign out
  async signOut() {
    return 'sign out';
  }
}
