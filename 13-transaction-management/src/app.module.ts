import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';

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
  entities: [__dirname + '/**/*.entity*{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  logging: true,
});

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
