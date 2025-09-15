import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService],
  exports: [PaymentService], //payment servisini dışa aktarıyoruz ki başka modüllerde de kullanabilelim
})
export class PaymentModule {}
