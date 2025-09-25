import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use); // global olarak middleware i uyguladık.
  app.enableCors({ // CORS ayarları
    origin: '*', // tüm domainlere izin ver
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // izin verilen methodlar
    preflightContinue: false, // preflight request i devam ettirme
    credentials: true, // cookie gönderme izni
    allowedHeaders: 'Content-Type, Accept, Authorization', // izin verilen headerlar
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
