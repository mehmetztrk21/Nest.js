import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product.entity';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get('/getQuery')
    async GetQuery(@Query('name') name: string) {
        console.log(name, 'mehmet');
        return this.productService.getQuery(name);
    }

    @Get('/getGroupedQuery')
    async getProductsByGrouped() {
        return this.productService.getProductsByGrouped();
    }

    @Post()
    async createProduct(@Body() product: Product) {
        console.log(product);
        return this.productService.createProduct(product);
    }
    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return this.productService.getProductById(id);
    }
    @Put(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body() product: Partial<Product>,
    ) {
        return this.productService.updateProduct(id, product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}
