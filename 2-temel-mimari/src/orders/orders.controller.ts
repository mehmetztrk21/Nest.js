import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAllOrders() {
    return 'This action returns all orders';
  }

  @Get('categories/*path') // Şu anlama gelir: orders/categories/elektronik, orders/categories/kitap vb. Yani "categories/" ile başlayan her şeyi yakalar.
  getOrdersByCategory() {
    return 'This action returns all orders in a specific category';
  }
}
