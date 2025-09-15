import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  providers: [PaymentService],
  exports: [PaymentService],
  controllers: [PaymentController], //payment servisini dışa aktarıyoruz ki başka modüllerde de kullanabilelim
})
export class PaymentModule {}
