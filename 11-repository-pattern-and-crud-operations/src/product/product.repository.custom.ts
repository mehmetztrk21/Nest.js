import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
    constructor(private dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }
    async findByName(name: string): Promise<Product[]> {
        return this.createQueryBuilder('product')
            .where('product.name LIKE :name', { name: `%${name}%` })
            .getMany();
    }
}
