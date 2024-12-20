import 'dotenv/config';

import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('OpenAI summarization')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'auth')
    .addTag('hashthink')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger-docs', app, documentFactory);

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.info('+=============================================+');
  console.info('----------------------------------------------------');
  console.info(`| GraphQL API URL:       http://localhost:${port}     |`);
  console.info('----------------------------------------------------');
}
bootstrap();
