import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PaymentService } from 'src/payment/payment.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  private paymentService: PaymentService;
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly moduleRef: ModuleRef,
  ) {
    this.paymentService = this.moduleRef.get(PaymentService, { strict: false }); //orders.module.ts içinde payment modulünü import etmeden de payment servisini kullanabilmek için ModuleRef ile dinamik olarak alıyoruz.Farklı bir yaklaşım.
  }

  getOrderList(userId: number) {
    const user = this.usersService.getUserById(userId);
    return {
      user,
      orders: [
        {
          orderId: 1,
          product: this.productsService.getProductById(1),
          payment: this.paymentService.getPaymentType('Credit Card'),
        },
        {
          orderId: 2,
          product: this.productsService.getProductById(2),
          payment: this.paymentService.getPaymentType('PayPal'),
        },
      ],
    };
  }
}
