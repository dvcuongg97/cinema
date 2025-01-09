import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // profile

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.userService.profile(user_id);
  }
  //
  @Patch(':user_id')
  update(@Param('user_id') user_id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user_id, updateUserDto);
  }

  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.userService.remove(user_id);
  }
}
