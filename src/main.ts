import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors()

  app.setBaseViewsDir(join(__dirname,'../views'));
  app.setViewEngine('pug');

  const config = new DocumentBuilder()
    .setTitle('ДОКУМЕНТАЦИЯ К OWL SHOP API ')
    .setDescription('API для админки и бота')
    .setVersion('1.0.0')
    .addTag('OWL SHOP')
    .build()

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('/doc', app, document)

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
