import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) { }

  async create(createPaymentDto: CreatePaymentDto, user_id: string) {
    // const validUser = await this.prisma.user.count({ where: { id: user_id } })
    // if (!validUser) throw new ForbiddenException()
    await this.userService.userCheck(user_id)

    const emptySeat = createPaymentDto.Seats
      .filter((seat) => { return seat.status === 'EMPTY' })

    const total = emptySeat.map((s) => s.price).reduce((sum, price) => sum + price, 0)

    const rs = await this.prisma.$transaction([
      this.prisma.payment.create({
        data: {
          Seats: {
            connect: createPaymentDto.Seats.map((seat) => ({ id: seat.id }))
          },
          user_id,

          totalAmount: total,
          paymentMethod: createPaymentDto.paymentMethod
        }
      }),
      this.prisma.seat.updateMany({
        where: {
          id: {
            in: createPaymentDto.Seats.map((seat) => seat.id),
          },
        },
        data: {
          status: 'BOOKED', // Trạng thái sau khi thanh toán thành công
        },
      })
    ])
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
