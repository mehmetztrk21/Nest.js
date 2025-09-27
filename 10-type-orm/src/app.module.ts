import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UsersModule } from './users/users.module';
//npm i @nestjs/typeorm
//npm i mysql2
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'nestjs',
      password: 'nestjs',
      database: 'nestjs',
      //entities: [__dirname + '/**/*.entity{.ts,.js}'], // entitylerin yolu
      entities: [User], // entitylerin yolu
      migrations: [__dirname + '/migrations/*{.ts,.js}'], // migration dosyalarının yolu
      migrationsRun: true, // uygulama başlatıldığında migrationları çalıştır
      synchronize: true, // true yaparsak entityler otomatik tabloya çevrilir
      autoLoadEntities: true, // entityleri otomatik yükler
      connectTimeout: 10000, // bağlantı zaman aşımı süresi
      debug: false, // debug modu
      logger: 'simple-console', // loglama türü (simple-console: konsola basar, advanced-console: daha detaylı loglama yapar)
      poolSize: 10, // bağlantı havuzu boyutu
      retryDelay: 5000, // yeniden deneme gecikmesi (ms)
      retryAttempts: 3, // yeniden deneme sayısı
      supportBigNumbers: true, // büyük sayıları destekle
      bigNumberStrings: false, // büyük sayıları string olarak döndürme
      logging: true, // loglama (true: tüm logları göster, false: hiç log gösterme, ['query', 'error']: sadece query ve error loglarını gösterme gibi özelleştirilebilir
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
