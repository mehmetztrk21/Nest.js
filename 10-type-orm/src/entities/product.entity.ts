import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity({
    name: 'products', // tablo adı
    orderBy: {
        id: 'ASC', // id'ye göre artan sırala
        createdAt: 'DESC', // createdAt'a göre azalan sırala
    },
})
@Index(['name']) // composite index
export class Product extends BaseEntity {
    @Column('varchar', { length: 100 })
    name: string;

    @Column('text', { nullable: true }) // nullable:true yaparsak bu kolon null olabilir
    description: string;

    @Column('decimal', { precision: 10, scale: 2 }) // toplam 10 hane, 2'si ondalık
    price: number;
}
