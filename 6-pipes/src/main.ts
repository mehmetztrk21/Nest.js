import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { customValidatorPipe } from 'validator/customValidator.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(customValidatorPipe); //  tüm uygulamada geçerli olacak şekilde custom validation pipe ını ekliyoruz
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
