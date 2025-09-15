import { forwardRef, Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersService],
  imports: [UsersModule, forwardRef(() => ProductsModule)], //Circular dependency with ProductsModule, using forwardRef
  exports: [OrdersService], //Exporting OrdersService to be used by other modules
})
export class OrdersModule {}
