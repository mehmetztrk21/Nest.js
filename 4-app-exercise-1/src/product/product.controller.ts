import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductModel } from './product.model';
import { CustomExceptionFilter } from 'src/utils/customExceptionFilter';

@Controller('product')
@UseFilters(CustomExceptionFilter)
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productService.getProductById(Number(id));
    }
    @Post()
    createProduct(@Body() product: Partial<ProductModel>) {
        const newProduct = this.productService.createProduct(product);
        return newProduct;
    }
    @Put('activate/:id')
    activateProduct(@Param('id') id: string) {
        return this.productService.activateProduct(Number(id));
    }
    @Put('deactivate/:id')
    deactivateProduct(@Param('id') id: string) {
        return this.productService.deactivateProduct(Number(id));
    }
    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() product: Partial<ProductModel>) {
        return this.productService.updateProduct(Number(id), product);
    }
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(Number(id));
    }

}
