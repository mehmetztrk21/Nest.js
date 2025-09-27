import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm'; // npm i typeorm

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) { }

    async getAllProducts() {
        return this.productRepository.find();
    }

    async getProductById(id: string): Promise<Product | null> {
        return this.productRepository.findOneBy({ id });
    }

    async createProduct(product: Product): Promise<Product> {
        const p: Partial<Product> = {
            name: product.name,
            description: product.description,
            price: product.price,
        };
        console.log(p);
        return this.productRepository.save(p);
    }
    async updateProduct(id: string, product: Partial<Product>): Promise<void> {
        await this.productRepository.update(id, product);
    }
    async deleteProduct(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
    async getQuery(name: string): Promise<Product[]> {
        return this.productRepository
            .createQueryBuilder('product')
            .where('product.name LIKE :name', { name: `%${name}%` })
            .andWhere('product.isActive = :isActive', { isActive: true })
            .getMany();

        //veya raw query ile yapabiliriz
        // return this.productRepository.query(
        //     'SELECT * FROM products WHERE name LIKE ? AND isActive = ?',
        //     [`%${name}%`, true],
        // );
    }
}
