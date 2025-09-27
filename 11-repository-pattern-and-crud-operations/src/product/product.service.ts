import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Between, In, Like, MoreThan, Repository } from 'typeorm'; // npm i typeorm

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

    async getProductsQuery(id: string) {
        //aynı sorguyu yukarıdaki gibi query builder ile de yapabiliriz
        //     return this.productRepository
        //         .createQueryBuilder('product')
        //         .where('product.id IN (:...ids)', { ids: [1, 2, 3] })
        //         .andWhere('product.price BETWEEN :min AND :max', { min: 100, max: 500 })
        //         .orWhere('product.name LIKE :name', { name: '%phone%' })
        //         .andWhere('product.price > :price', { price: 100 })
        //         .getMany();
        // }

        return this.productRepository.find({
            // where: [
            //     //her süslü parantez and demek, virgül ise or demek
            //     {
            //         id: In[(1, 2, 3)],
            //         price: Between(100, 500),
            //     },
            //     {
            //         name: Like('%phone%'),
            //         price: MoreThan(100),
            //     },
            // ],
        });
    }

    async getProductsByGrouped() {
        return this.productRepository
            .createQueryBuilder('product')
            .select('product.isActive', 'isActive')
            .addSelect('COUNT(*)', 'count')
            .groupBy('product.isActive')
            .orderBy('product.isActive', 'ASC') // Sadece groupBy sütunu ile order
            .getRawMany();
    }
}
