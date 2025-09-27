import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
//npm i @nestjs/typeorm
//npm i mysql2
@Module({
  imports: [UsersModule, DatabaseModule, ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'nestjs',
      password: 'nestjs',
      database: 'nestjs',
      synchronize: true,
      autoLoadEntities: true,
      connectTimeout: 10000,
      logger: 'simple-console',
      poolSize: 20,
      retryAttempts: 20,
      retryDelay: 5000,
      supportBigNumbers: true,
      // entities:[User],
      entities: [__dirname + '/**/*.entity*{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*.ts'],
      logging: true,
      //   subscribers: [__dirname + '/**/*.entity*{.ts,.js}'],
      //  ssl:{

      //  }

      // migrationsRun:true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
