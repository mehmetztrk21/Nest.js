import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Between, In, Like, MoreThan, Repository } from 'typeorm'; // npm i typeorm
import { ProductRepository } from './product.repository.custom';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) { }

    async getAllProducts() {
        return this.productRepository.find();
    }

    async getProductById(id: string): Promise<Product | null> {
        return this.productRepository.findOneBy({ id });
    }

    async createProduct(product: Product): Promise<Product> {
        const p = new Product() as Partial<Product>;
        p.name = product.name;
        p.description = product.description;
        p.price = product.price;
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

    async createProductWithTransaction(product: Product) {
        return this.productRepository.manager.transaction(
            'READ COMMITTED',
            //READ UNCOMMITTED: En düşük izolasyon seviyesidir. Bir transaction, başka bir transaction tarafından commit edilmemiş verileri okuyabilir (dirty read).
            //READ COMMITTED: Bir transaction, başka bir transaction tarafından commit edilmemiş verileri okuyamaz. Default seviyedir.
            //REPEATABLE READ: Bir transaction, aynı veriyi tekrar okuduğunda, o verinin başka bir transaction tarafından değiştirilmemiş olduğunu garanti eder.
            //SERIALIZABLE: En katı izolasyon seviyesidir. Transactionlar birbirini tamamen izole eder, bu da en yüksek veri bütünlüğünü sağlar ancak performansı düşürebilir.
            async (transactionalEntityManager) => {
                const p: Partial<Product> = {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                };
                const newProduct = await transactionalEntityManager.save(p);
                //başka işlemler de yapabiliriz. Örneğin stok tablosuna da ekleme yapabiliriz. Hata olursa tüm işlemler rollback olur
                return newProduct;
            },
        );
    }

    async getProductByName(name: string): Promise<Product[]> {
        return this.productRepository.findByName(name);
    }
}
