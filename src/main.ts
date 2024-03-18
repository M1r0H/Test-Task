import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';
import cookieParser from 'cookie-parser';
import * as process from 'process';
import { useContainer } from 'class-validator';

async function bootstrap() {
  // nest app
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false,
      'optionsSuccessStatus': 204,
    },
  });

  app.use(cookieParser());

  // Document config for Swagger
  // Use "http://localhost:3001/swagger-json" url to import Swagger API definitions to Postman
  const config = new DocumentBuilder()
    .addServer(process.env.SERVER_URL)
    .setTitle('Test task API')
    .setExternalDoc('Swagger JSON', '/swagger-json')
    .addCookieAuth('auth-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // swagger documentation
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // enable DI for class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // start app
  await app.listen(process.env.PORT);
}

bootstrap();
