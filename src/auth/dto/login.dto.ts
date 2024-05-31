import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'streamgcrafting@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
