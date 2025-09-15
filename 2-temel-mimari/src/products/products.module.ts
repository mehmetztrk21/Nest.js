import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService],
  exports: [ProductsService], //products servisini dışa aktarıyoruz ki başka modüllerde de kullanabilelim
})
export class ProductsModule {}
