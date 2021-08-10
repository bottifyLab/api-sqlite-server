import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors()

  app.setBaseViewsDir(join(__dirname,'../views'));
  app.setViewEngine('pug');

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
