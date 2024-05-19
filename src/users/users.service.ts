import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashPassword = await argon.hash(createUserDto.password);
    const newUser: CreateUserDto = {
      ...createUserDto,
      password: hashPassword,
    };
    return this.userRepository.save(newUser);
  }
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async delete(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException({
        success: false,
        message: 'User not found',
      });
    }
    await this.userRepository.delete(user._id);
    return {
      success: true,
      message: 'user deleted successfully',
    };
  }
}
