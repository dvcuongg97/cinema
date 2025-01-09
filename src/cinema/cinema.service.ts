import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from 'src/validations/validation.service';

@Injectable()
export class CinemaService {

  constructor(
    private prisma: PrismaService,
    private validion: ValidationService
  ) { }

  // create 
  async create(createCinemaDto: CreateCinemaDto) {
    //
    const validName = await this.nameCheck(createCinemaDto.name)
    if (validName) throw new BadRequestException('Cinema Exist')

    const newCinema = await this.prisma.cinema.create({
      data: { ...createCinemaDto }
    })
    return newCinema
  }
  // pagination
  async findAll(skip: number = 0, take: number = 3) {
    const results = await this.prisma.cinema.findMany({
      skip,
      take
    })
    return results
  }
  // find one
  async findOne(name: string) {
    //
    const rs = await this.prisma.cinema.findUnique({
      where: { name }
    })

    if (!rs) {
      throw new BadRequestException(`Cinema Don't Exists`)
    }

    return rs
  }
  // update
  async update(name: string, updateCinemaDto: UpdateCinemaDto) {

    const existName = await this.nameCheck(name)
    if (!existName) throw new BadRequestException(`${name} Not Found`)

    const validName = await this.nameCheck(updateCinemaDto.name)
    if (!validName) throw new BadRequestException(`${name} Not Found`)

    const updated = await this.prisma.cinema.update({
      where: {
        name,
      },
      data: { ...updateCinemaDto }
    })

    return updated
  }
  // remove
  async remove(name: string) {
    // remove cinema
    const removed = this.prisma.cinema.delete({
      where: { name }
    })
    // remove relation
    const removedScreen = this.prisma.cinema.deleteMany({
      where: { name }
    })

    const transaction = await this.prisma.$transaction([removed, removedScreen])
    return transaction ? true : null
  }

  //
  async nameCheck(name: string) {
    return await this.prisma.cinema.count({ where: { name } })
  }
  async idCheck(id: string) {
    return await this.prisma.cinema.count({ where: { id } })
  }
}
