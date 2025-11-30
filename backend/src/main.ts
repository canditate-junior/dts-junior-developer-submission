import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global Validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Civil Service Technical Challenge')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start Server
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
