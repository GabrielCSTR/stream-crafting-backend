import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Global Pipes
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  await app.listen(port, () => {
    Logger.log(`🚀 App is running on: ${port as string}`, 'D2 CASTER SERVER');
  });
}

bootstrap().catch((e: Error) => {
  Logger.error(`❌ Error starting server, ${e.message} - ${e.stack}`);
  throw e;
});
