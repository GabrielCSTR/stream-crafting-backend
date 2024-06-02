import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';
import { IsUniqueConstraint } from './utils/validators/validators';
import { PlayersModule } from './players/players.module';
import { GsiServerModule } from './gsi_server/gsi_server.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@d2cast.t9s3uvn.mongodb.net/${process.env.DB_DATABASE}?authSource=admin&retryWrites=true&w=majority&appName=${process.env.DB_DATABASE}`,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      logging: true,
    }),
    TeamsModule,
    PlayersModule,
    GsiServerModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule { }
