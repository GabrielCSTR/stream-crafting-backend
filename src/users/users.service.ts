import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(createUserDto);
  }
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
