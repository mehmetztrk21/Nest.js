import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProductById(id: number): { id: number; name: string } {
    return { id, name: `Product${id}` };
  }
}
