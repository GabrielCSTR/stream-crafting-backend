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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Teams')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateTeamDto,
    description: 'Json structure for user object',
  })
  async create(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'The record return all teams.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return await this.teamsService.findAll();
  }

  @Get(':name')
  @ApiResponse({
    status: 201,
    description: 'The record return specific team.',
  })
  @ApiParam({
    name: 'name',
    type: String,
    required: true,
    description: 'Informe name team.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('name') name: string) {
    return await this.teamsService.findOne(name);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'The record update team.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Informe id team.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'The record delete specific team.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Informe id team.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
