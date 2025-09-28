import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'localhost',
      port: 1434,
      username: 'sa',
      password: 'A1b2C3d4!',
      database: 'sequelizeDb',
      pool: {
        max: 5,
        min: 0,
        maxUses: 1,
      },
      // sync: {
      //   force: true, // Şu demek: Her uygulama başlatıldığında tabloları sil ve yeniden oluştur.
      // },
      autoLoadModels: true, // Tüm modelleri otomatik olarak yükler
      logging: true,
      dialectOptions: {
        options: {
          encrypt: false,
        },
      },
      synchronize: true,
      retryAttempts: 3,
    }),
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
