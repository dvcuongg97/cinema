import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from 'src/validations/validation.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  // profile
  async profile(user_id: string) {

    await this.userCheck(user_id)

    const profile = await this.prisma.user.findUnique({
      where: { id: user_id }
    })
    return profile
  }

  // update 
  async update(user_id: string, updateUserDto: UpdateUserDto) {
    await this.userCheck(user_id)
    const update = await this.prisma.user.update(
      {
        where: { id: user_id },
        data: updateUserDto
      })

    return update
  }
  // delete
  async remove(user_id: string) {
    await this.userCheck(user_id)
    const result = await this.prisma.user.delete({ where: { id: user_id } })
    if (typeof result !== null) return result;
  }

  async userCheck(user_id: string) {
    const rs = await this.prisma.user.count({ where: { id: user_id } })
    if (!rs) throw new ForbiddenException(`${user_id} Not Found`)
  }
  async emailCheck(email: string) {
    const rs = await this.prisma.user.count({ where: { email } })
    if (!rs) throw new ForbiddenException(`${email} Already Exists`)
  }

}

