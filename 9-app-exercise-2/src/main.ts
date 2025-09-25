import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // tüm domainlere izin ver
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // izin verilen methodlar
    preflightContinue: false, // preflight request i devam ettirme
    credentials: true, // cookie gönderme izni
    allowedHeaders: 'Content-Type, Accept, Authorization', // izin verilen headerlar
  }); // global olarak CORS u etkinleştir
  app.use(compression()); // response  ları gzip ile sıkıştırır
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
