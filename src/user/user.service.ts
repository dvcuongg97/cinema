import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  // profile
  async profile(user_id: string) {
    await this.userCheck(user_id);

    const rs = await this.prisma.user.findUnique({
      where: { id: user_id },
    });
    return rs;
  }

  // update
  async update(user_id: string, updateUserDto: UpdateUserDto) {
    await this.userCheck(user_id);
    const update = await this.prisma.user.update({
      where: { id: user_id },
      data: updateUserDto,
    });

    return update;
  }
  // delete
  async remove(user_id: string) {
    await this.userCheck(user_id);
    const result = await this.prisma.user.delete({ where: { id: user_id } });
    if (typeof result !== null) return result;
  }

  async userCheck(user_id: string) {
    const rs = await this.prisma.user.count({ where: { id: user_id } });
    if (!rs) throw new BadRequestException(`${user_id} Not Found`);
  }
  async emailCheck(email: string) {
    const rs = await this.prisma.user.count({ where: { email } });
    if (rs) throw new BadRequestException(`${email} Already Exists`);
  }

  // validate
  async validateUser(email: string, password: string): Promise<any> {
    const usr = await this.prisma.user.findUnique({ where: { email } });
    if (!usr) throw new UnauthorizedException();
    const pwMatch = await argon2.verify(usr.password, password);
    if (pwMatch) {
      const { password, ...result } = usr;
      return result;
    }
    return null;
  }
}
