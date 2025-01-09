import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'process';
import { Prisma } from '@prisma/index';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
  ) { }

  // create
  async create(createMovieDto: CreateMovieDto) {
    const movieCheck = this.movieCheck(createMovieDto.title)
    if (movieCheck)
      throw new BadRequestException(`${createMovieDto.title} Already Exists`)
    const newMovie = await this.prisma.movie
      .create({ data: { ...createMovieDto } })
    //
    return newMovie
  }

  // pagination
  async findAll(skip: number, take: number) {
    /// WTFFFF
    const results = await this.prisma.movie.findMany({
      skip,
      take
    })
    return results
  }
  // find one
  async findOne(title: string) {
    //
    const rs = await this.prisma.movie.findUnique({
      where: { title }
    })
    if (!rs) {
      throw new BadRequestException(`Movie Don't Exists`)
    }

    return rs
  }
  //update
  async update(updateMovieDto: UpdateMovieDto, id: string) {
    //
    const idCheck = await this.idCheck(id)
    if (!idCheck) throw new BadRequestException(`${title} Not Found`)

    const updated = await this.prisma.movie.update({
      where: { id },
      // data: updateMovieDto as Prisma.MovieUncheckedUpdateInput,
      data: {
        ...updateMovieDto
      }
    })

    return updated
  }
  // remove
  async remove(title: string) {

    const rs = await this.movieCheck(title)
    if (!rs) throw new BadRequestException(`${title} Not Found`)

    const deletePosts = this.prisma.movie.deleteMany({
      where: {
        title,
      },
    })
    const deleteUser = this.prisma.movie.delete({
      where: {
        title
      },
    })
    const transaction = await this.prisma.$transaction([deletePosts, deleteUser])
    return transaction ? true : null
  }
  /// common
  async movieCheck(title: string) {
    return await this.prisma.movie.count({ where: { title } })
  }
  async idCheck(id: string) {
    return await this.prisma.movie.count({ where: { id } })
  }
}
