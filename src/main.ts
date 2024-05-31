import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Streaming Crafting API')
    .setDescription('STREAMING CRAFTING API currently provides data')
    .setVersion('0.0.1')
    .addServer('http://localhost:3000/api/v1/', 'Local environment')
    .addServer('https://streamcrafting.com/api/v1/', 'Streaming Craft API')
    .addServer('https://production.streamcrafting.com/api/v1/', 'Production')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    // .addTag('SC')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
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
