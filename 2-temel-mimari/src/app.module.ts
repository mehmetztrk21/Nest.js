import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Yeni bir modül oluşturmak için terminalde şu komutu kullanabiliriz:
//nest g module users
//nest g controller users --no-spec
//nest g service users --no-spec
