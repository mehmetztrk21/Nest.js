import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ProductSubscriber } from './product/product.subscriber';
import { CountryModule } from './country/country.module';
import { DataSource } from 'typeorm';
//npm i @nestjs/typeorm
//npm i mysql2

export const AppDataSource = new DataSource({
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
      subscribers: [ProductSubscriber],
      //   subscribers: [__dirname + '/**/*.entity*{.ts,.js}'],
      //  ssl:{

      //  }

      // migrationsRun:true
    });

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ProductModule,
    CountryModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
