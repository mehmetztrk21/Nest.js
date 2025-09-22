import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
    private products: ProductModel[] = [];

    createProduct(product: Partial<ProductModel>) {
        const newProduct: ProductModel = {
            id: Math.floor(Math.random() * 10000),
            name: product.name || 'Unnamed Product',
            description: product.description || '',
            price: product.price || 0,
            isActive: product.isActive !== undefined ? product.isActive : true,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    getAllProducts(): ProductModel[] {
        return this.products;
    }

    getProductById(id: number): ProductModel | undefined {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id: number, updatedFields: Partial<ProductModel>): ProductModel | undefined {
        const product = this.getProductById(id);
        if (product) {
            Object.assign(product, updatedFields);
            return product;
        }
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    deleteProduct(id: number): boolean {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
    activateProduct(id: number): ProductModel | undefined {
        const product = this.getProductById(id);
        if (product) {
            product.isActive = true;
            return product;
        }
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    deactivateProduct(id: number): ProductModel | undefined {
        const product = this.getProductById(id);
        if (product) {
            product.isActive = false;
            return product;
        }
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
}
