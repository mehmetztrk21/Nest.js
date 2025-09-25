import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { StudentModule } from './student/student.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';

@Module({
  imports: [StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // tüm route larda çalışır, istersek belli route larda da çalıştırabiliriz
    consumer.apply(AuthMiddleware)
      .forRoutes('student'); // sadece student route unda çalışır

    //veya
    // consumer.apply(LoggerMiddleware, AuthMiddleware)
    //   .forRoutes('student'); // birden fazla middleware i aynı anda uygulayabiliriz
  }
}
