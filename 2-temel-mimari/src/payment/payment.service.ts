import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  getPaymentType(paymentType: string): string {
    return `Payment type is ${paymentType}`;
  }
}
