import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { isUnique } from 'src/utils/validators/validators';

export class CreateTeamDto {
  @ApiProperty({
    example: 'streamcrafting team',
    description: 'The name of the team',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @isUnique({ tableName: 'teams', column: 'name' })
  name: string;

  @ApiProperty({
    example: 'SCT',
    description: 'The tag of the team',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  tag: string;

  @ApiProperty({
    example: 'US',
    description: 'The country of the team',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: 'logo',
    description: 'The image of the team',
    required: true,
  })
  @IsOptional()
  @IsNotEmpty()
  logo?: string;
}
