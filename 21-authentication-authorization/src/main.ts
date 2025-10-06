import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: "mySecretKey",
    resave: false, // oturumun her istekte yeniden kaydedilmesini engeller
    saveUninitialized: false, // oturumun başlangıçta boş olarak kaydedilmesini engeller
    cookie: { maxAge: 60000 } //oturum çerezi 1 dakika sonra sona erer
  }))
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
