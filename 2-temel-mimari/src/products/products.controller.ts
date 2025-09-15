import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

interface IUserProductWithCategoryRequest {
  userId: number;
  productId: number;
  categoryId: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return 'List of products';
  }
  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }
  @Get(':userId/products/:productId')
  getUserProduct(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return {
      userId,
      product: this.productsService.getProductById(productId),
    };
  }
  @Get(':userId/products/:productId/:categoryId')
  getUserProductByCategory(@Param() params: IUserProductWithCategoryRequest) {
    const { userId, productId, categoryId } = params;
    return {
      userId,
      product: this.productsService.getProductById(productId),
      categoryId: categoryId,
    };
  }
}
