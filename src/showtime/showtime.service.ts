import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScreenService } from 'src/screen/screen.service';

@Injectable()
export class ShowtimeService {
  //
  constructor(
    private prisma: PrismaService,
    private screen: ScreenService
  ) { }


  // create
  async create(
    dto: CreateShowtimeDto,
    movie_id: string,
    screen_id: string
  ) {

    const [rs1, rs2] = await Promise.all([
      this.screen.isExits(screen_id),
      this.isExists(movie_id)
    ])
    if (!rs1 || !rs2) throw new BadRequestException()

    const data = {
      movie_id,
      screen_id,
      ...dto
    }

    const newShowtime = this.prisma.showtime.create({
      data
    });

    return newShowtime
  }

  // update
  async update(id: string, dto: UpdateShowtimeDto) {

    const rs = await this.isExists(id)
    if (!rs)
      throw new BadRequestException('Not Found')
    ///
    const updated = await this.prisma.showtime.update({
      where: { id },
      data: dto
    })

    return updated

  }
  // remove
  async remove(id: string) {
    const rs = await this.isExists(id)
    if (!rs) throw new ForbiddenException()

    const deleteShowtime = this.prisma.showtime
      .delete({ where: { id } })
    const deleteSeats = this.prisma.seat
      .deleteMany({ where: { showtime_id: id } })
    const transaction = await this.prisma.
      $transaction([deleteSeats, deleteShowtime])

    return transaction ? 'SUCCESSFUL' : 'FAILED'
  }

  ///////////////
  /// commom ///
  /////////////

  async isExists(id: string) {
    return await this.prisma.showtime.count({ where: { id } })
  }


}
