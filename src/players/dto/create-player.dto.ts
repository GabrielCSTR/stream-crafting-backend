import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'stream name',
    description: 'The name of the player',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'crafting name',
    description: 'The last name of the player',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'streamcrafting',
    description: 'The nickname of the player',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nick: string;

  @ApiProperty({
    example: 'US',
    description: 'The country of the team',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'ID team of the player',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  team?: string;

  @ApiProperty({
    description: 'Player avatar',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  avatar?: string;
}
