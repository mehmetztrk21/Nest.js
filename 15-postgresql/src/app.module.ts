import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BookModule,
    //aslında hangi veritabanını kullanacaksak onu yazıyoruz. Başka bir şey değişmiyor.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      retryAttempts: 10,
      retryDelay: 3000,
      autoLoadEntities: true, // Tüm entity ler otomatik olarak yüklenir
      synchronize: true, // Entity ler otomatik olarak senkronize edilir
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
