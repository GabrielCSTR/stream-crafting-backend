import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Players')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreatePlayerDto,
    description: 'Json structure for user object',
  })
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'The record return all players.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return await this.playersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'The record return specific player.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Informe id player.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string) {
    return await this.playersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'The record update player.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Informe id player.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return await this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'The record delete specific player.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Informe id player.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    return await this.playersService.remove(id);
  }
}
