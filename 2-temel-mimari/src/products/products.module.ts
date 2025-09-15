import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [forwardRef(() => OrdersModule)], //Orders module products modülünü import ediyor, döngüsel bağımlılığı önlemek için forwardRef kullanıyoruz
  providers: [ProductsService],
  exports: [ProductsService], //products servisini dışa aktarıyoruz ki başka modüllerde de kullanabilelim
  controllers: [ProductsController],
})
export class ProductsModule {}
