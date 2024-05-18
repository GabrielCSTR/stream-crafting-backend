import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@d2cast.t9s3uvn.mongodb.net/${process.env.DB_DATABASE}?authSource=admin&retryWrites=true&w=majority&appName=${process.env.DB_DATABASE}`,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
