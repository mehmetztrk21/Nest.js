import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { StudentModule } from './student/student.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { validateMiddleware } from './middlewares/validate.middleware';

@Module({
  imports: [StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer // main.ts de global olarak middleware i uyguladık.
    //   .apply(LoggerMiddleware)
    //   .forRoutes('*'); // tüm route larda çalışır, istersek belli route larda da çalıştırabiliriz
    consumer.apply(AuthMiddleware)
      .forRoutes('student'); // sadece student route unda çalışır

    consumer.apply(validateMiddleware)
      .forRoutes({ path: "student", method: RequestMethod.GET }); // sadece student route unda GET methodu için çalışır

    consumer.apply(validateMiddleware)
      .exclude("auth/login") // auth/login route unda çalışmaz
      .forRoutes('student', "user"); // student ve user route larda çalışır

    //veya
    // consumer.apply(LoggerMiddleware, AuthMiddleware)
    //   .forRoutes('student'); // birden fazla middleware i aynı anda uygulayabiliriz
  }
}
