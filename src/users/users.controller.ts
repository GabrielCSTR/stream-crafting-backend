import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async create(@Body('userDto') userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }
}
