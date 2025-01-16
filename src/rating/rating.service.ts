import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RatingService {
  constructor(
    private readonly movie: MovieService,
    private readonly user: UserService,
    private readonly prisma: PrismaService
  ) { }
  // create
  async create(movie_id: string, createRatingDto: CreateRatingDto) {
    await this.movieCheck(movie_id)
    await this.user.userCheck(createRatingDto.user_id)
    const userRated = await this.userRatingExisted(movie_id)
    if (userRated) throw new BadRequestException('You Have Rated')

    const data = {
      ...createRatingDto,
      movie_id
    }
    const rating = await this.prisma.rating.create({ data })

    return rating ? rating : 'Internal Error'
  }

  async findAll(movie_id: string) {
    await this.movieCheck(movie_id)

    const rs = await this.prisma.rating.findMany({
      where: { movie_id },
      //  include: {
      //   Movie: true
      //  }
    })
    return rs ? rs : 'Internal Error'
  }

  async avgScore(movie_id: string) {
    await this.movieCheck(movie_id)

    const avgScore = await this.prisma.rating.aggregate({
      where: { movie_id },
      _avg: { score: true }
    })

    return avgScore
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  async remove(user_id: string, move_id: string) {
    await this.movieCheck(move_id)
    const userRated = await this.userRatingExisted(user_id)
    if (userRated) this.prisma.rating.delete({
      where: { user_id }
    })
  }

  //
  async movieCheck(id: string) {
    const movieCheck = await this.movie.idCheck(id)
    if (!movieCheck) { throw new BadRequestException('Movie Not Found') }
  }
  async userRatingExisted(user_id: string) {
    const rs = await this.prisma.rating.count({ where: { user_id } })
    return rs
  }
}
