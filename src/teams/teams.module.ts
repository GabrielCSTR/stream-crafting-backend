import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
