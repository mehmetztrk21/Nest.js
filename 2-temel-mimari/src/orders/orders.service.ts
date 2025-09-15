import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  getOrderList(userId: number) {
    const user = this.usersService.getUserById(userId);
    return {
      user,
      orders: [
        { orderId: 1, product: this.productsService.getProductById(1) },
        { orderId: 2, product: this.productsService.getProductById(2) },
      ],
    };
  }
}
