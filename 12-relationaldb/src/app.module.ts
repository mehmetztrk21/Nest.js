import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserProfileModule } from './user_profile/user_profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    UserModule,
    UserProfileModule,
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'nestjs',
      password: 'nestjs',
      database: 'nestjs',
      synchronize: true,
      connectTimeout: 10000,
      logger: 'simple-console',
      poolSize: 20,
      supportBigNumbers: true,
      // entities:[User],
      entities: [__dirname + '/**/*.entity*{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*.ts'],
      logging: true,
    }),
    StudentModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
