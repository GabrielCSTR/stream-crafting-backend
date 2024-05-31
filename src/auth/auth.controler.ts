import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully login.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: LoginDto,
    description: 'Json structure for user object',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully refrash token.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: String,
    description: 'Informe refresh_token for generating refresh token',
  })
  @Post('refresh')
  reautenticar(@Body() body) {
    return this.authService.refreshToken(body);
  }
}
