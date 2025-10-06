import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('product')
@UseGuards(PermissionsGuard)
export class ProductController {

    @Get("")
    @Roles('admin', 'manager')
    @Permissions('product:read')
    getProductList() {
        return { message: 'Product List' };
    }

    @Get(":id")
    @Permissions('product:read')
    getProductDetail() {
        return { message: 'Product Detail' };
    }

    @Post("")
    @Permissions('product:create')
    createProduct() {
        return { message: 'Create Product' };
    }

    @Put(":id")
    @Permissions('product:update')
    updateProduct() {
        return { message: 'Update Product' };
    }

    @Delete(":id")
    @Permissions('product:delete')
    deleteProduct() {
        return { message: 'Delete Product' };
    }
}
