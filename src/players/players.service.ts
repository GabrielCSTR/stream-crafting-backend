import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: MongoRepository<PlayerEntity>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
    return await this.playerRepository.save(createPlayerDto);
  }

  async findAll(): Promise<PlayerEntity[]> {
    return await this.playerRepository.find();
  }

  async findOne(id: string): Promise<PlayerEntity> {
    const player = await this.playerRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!player) {
      throw new BadRequestException({
        success: false,
        message: 'Player not found',
      });
    }
    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    try {
      const player = await this.findOne(id);
      const playerUpdate = this.playerRepository.merge(player, updatePlayerDto);
      return await this.playerRepository.save(playerUpdate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const player = await this.findOne(id);
      return await this.playerRepository.remove(player);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
