import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], //modülün bağımlılıkları yani importları
  controllers: [AppController], //modülün denetleyicileri yani controllerları
  providers: [AppService], //modülün sağlayıcıları yani servisleri
  exports: [], //modülün dışa aktardığı şeyler
})
export class AppModule { }
