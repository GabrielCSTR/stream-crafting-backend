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
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'The record return all users.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'The record has delete user.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({
    name: 'email',
    type: String,
    required: true,
    description: 'Informe id team.',
  })
  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    return await this.userService.delete(email);
  }
}
