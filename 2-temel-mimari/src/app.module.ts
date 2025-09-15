import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Yeni bir modül oluşturmak için terminalde şu komutu kullanabiliriz:
//nest g module users
//nest g controller users --no-spec
//nest g service users --no-spec
