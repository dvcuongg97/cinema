import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CinemaService } from 'src/cinema/cinema.service';

@Injectable()
export class ScreenService {

  constructor(
    private prisma: PrismaService,
    private cinema: CinemaService
  ) { }

  //create
  async create(createScreenDto: CreateScreenDto) {
    return await this.prisma.screen.create({ data: createScreenDto })
  }

  findAll() {
    return `This action returns all screen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} screen`;
  }
  // update
  async update(
    id: string,
    // payload: any
    updateScreenDto: UpdateScreenDto
  ) {
    const check = await this.isExits(id)
    if (!check) throw new BadRequestException('Screen Not Found')
    const update = await this.prisma.screen.update(
      {
        where: { id },
        data: { ...updateScreenDto }
      })
    return update
  }

  //delete
  async remove(id: string) {
    const check = await this.isExits(id)
    if (!check) throw new BadRequestException('Screen Not Found')

  }
  /// common
  async isExits(movie_id: string) {
    return await this.prisma.screen.count({ where: { id: movie_id } })
  }
}
