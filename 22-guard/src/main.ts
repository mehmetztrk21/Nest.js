import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard(new JwtService())); // bu şekilde guard'ı global olarak uyguladık. ya böyle ya da app.module.ts içinde 'APP_GUARD' olarak tanımlayabiliriz
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
