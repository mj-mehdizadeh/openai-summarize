import 'dotenv/config';

import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('OpenAI summarization')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('hashthink')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger-docs', app, documentFactory);

  await app.listen(3000);

  console.info('+=============================================+');
  console.info('----------------------------------------------------');
  console.info(`| GraphQL API URL:       http://localhost:3000     |`);
  console.info('----------------------------------------------------');
}
bootstrap();
