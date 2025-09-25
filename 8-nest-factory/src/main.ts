import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    new FastifyAdapter(), // Express yerine Fastify kullanmak için. Fastify, Express'e göre daha hızlıdır ve daha az bellek kullanır.
    {
      logger: ['error', 'warn'], // sadece error ve warn loglarını göster
      cors: { // CORS ayarları burdan da yapılabilir
        origin: '*', // tüm domainlere izin ver
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // izin verilen methodlar
        preflightContinue: false, // preflight request i devam ettirme
        credentials: true, // cookie gönderme izni
        allowedHeaders: 'Content-Type, Accept, Authorization', // izin verilen headerlar
      },
      abortOnError: false, // uygulama başlatılırken hata olursa abort etme
      bodyParser: true, // body parser ı etkinleştir
      httpsOptions: {} // HTTPS ayarları
    });
  // NestFactory.createApplicationContext(AppModule); // arka planda çalışan uygulamalar için, örneğin cron job lar için
  // NestFactory.createMicroservice(AppModule, { // microservice uygulamaları için
  //   transport: 1, // TCP
  //   options: {
  //     host: 'localhost',
  //     port: 3001
  //   }
  // });

  // app.close(); // uygulamayı kapatmak için, örneğin testlerde
  // app.enableCors(); // global olarak CORS u etkinleştir
  // app.setGlobalPrefix('api'); // tüm route lara /api prefix i ekle
  // app.useGlobalFilters(); // global olarak exception filter ları ekle
  // app.useGlobalPipes(); // global olarak pipe ları ekle
  // app.useGlobalInterceptors(); // global olarak interceptor ları ekle
  // app.useGlobalGuards(); // global olarak guard ları ekle

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
