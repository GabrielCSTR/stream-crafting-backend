import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async login(loginDto: LoginDto) {
    return this.validateUser(loginDto.email, loginDto.password);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User or password incorrect');
    }
    const passwordMatches = await argon.verify(user.password, password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');
    return await this.genereteToken(user);
  }

  async refreshToken(body) {
    const payload: UserEntity = await this.checkRefreshToken(body); ////este método também será implementado abaixo
    return this.genereteToken(payload);
  }

  async genereteToken(payload: UserEntity) {
    const accessToken = this.jwtService.sign({ email: payload.email });

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.JWT_SECRET_REFRESH_TOKEN,
        expiresIn: '1d',
      },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }
  private async checkRefreshToken(body) {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException('user not found');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const usuario = await this.usersService.findOneByEmail(email);

    if (!usuario) {
      throw new NotFoundException('user not found');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_TOKEN,
      });
      return usuario;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('token invalidor error');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
