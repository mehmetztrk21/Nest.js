import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import xmlParser from 'express-xml-bodyparser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // xml formatında gelen request'leri parse etmek için yapılan ayardır.
  //  import xmlParser from 'express-xml-bodyparser';
  app.use(xmlParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
