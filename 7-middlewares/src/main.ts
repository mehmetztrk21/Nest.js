import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import helmet from 'helmet';
import compression from 'compression';

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

  app.use(helmet({
    contentSecurityPolicy: false,         // İçerik güvenlik politikası (CSP). Normalde hangi script, stil, resim kaynaklarının yüklenebileceğini kontrol eder. False yapınca kapatıyorsun.
    crossOriginEmbedderPolicy: false,     // Tarayıcının farklı domainlerden gelen kaynakların gömülmesini (embed) engelleme politikasını devre dışı bırakır.
    crossOriginResourcePolicy: false,     // Farklı domainlerden gelen resim, script, font gibi kaynakların kullanımını kontrol eder. False yapınca tüm kaynaklara izin verilir.
    frameguard: false,                    // Sayfanın <iframe> içine gömülmesini engeller (clickjacking’e karşı). False yapınca iframe içinde gösterilebilir.
    hsts: false,                          // HTTP Strict Transport Security. Tarayıcıya “daima HTTPS kullan” talimatı verir. False yapınca bu zorunluluk kalkar.
    ieNoOpen: false,                      // IE’nin dosya indirme güvenlik açığını kapatır. False yapınca devre dışı olur.
    noSniff: false,                       // Tarayıcıya içerik türünü (MIME type) tahmin etme (MIME sniffing) yasağı getirir. False yapınca tarayıcı tahmin etmeye devam eder.
    referrerPolicy: false,                // Referrer header bilgisinin nasıl gönderileceğini kontrol eder. False yapınca varsayılan tarayıcı davranışı kullanılır.
    xssFilter: false,                     // XSS saldırılarını engelleyen filtreyi açar. False yapınca bu filtre devre dışı olur.
  }));

  //app.use(compression()) HTTP yanıtlarını otomatik sıkıştırarak performansı ve bant genişliği verimliliğini artırır.
  app.use(compression()); // response  ları gzip ile sıkıştırır

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
