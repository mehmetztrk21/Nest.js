import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    // versioning aktif etme
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api'); // Tüm route'lara 'api' prefix'ini ekle. Ör: /api/users gibi yapar.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
