import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersService],
  imports: [UsersModule, ProductsModule], //başka modülleri import ediyoruz ki içindeki servisleri kullanabilelim
})
export class OrdersModule {}
