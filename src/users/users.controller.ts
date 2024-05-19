import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    return await this.userService.delete(email);
  }
}
