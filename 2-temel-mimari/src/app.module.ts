import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from './config/config.module';
import { CustomerModule } from './customer/customer.module';
import { PathModule } from './path/path.module';
import { LogModule } from './log/log.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrdersModule,
    PaymentModule,
    ConfigModule.forRoot('dev'), //Bütün projeyi ilgilendiriyor.
    CustomerModule.forFeature(), //belli bir modülü ilgilendiriyor.
    PathModule.register('https://example.com'), //runtime parametre alıyor
    LogModule.registerAsync(), // runtime çalışıyor ve async çalışıyor
    GlobalModule, // global modül. Diğer modüllerde import etmeye gerek yok.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Yeni bir modül oluşturmak için terminalde şu komutu kullanabiliriz:
//nest g module users
//nest g controller users --no-spec
//nest g service users --no-spec
