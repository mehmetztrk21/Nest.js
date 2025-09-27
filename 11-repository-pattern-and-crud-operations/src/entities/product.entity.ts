import { AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import { MyBaseEntity } from './base.entity';
@Entity({
  name: 'products', // tablo adı
  orderBy: {
    id: 'ASC', // id'ye göre artan sırala
    createdAt: 'DESC', // createdAt'a göre azalan sırala
  },
})
@Index(['name']) // composite index
export class Product extends MyBaseEntity {
  @Column('varchar', { length: 100 })
  name: string;

  @Column('text', { nullable: true }) // nullable:true yaparsak bu kolon null olabilir
  description: string;

  @Column('decimal', { precision: 10, scale: 2 }) // toplam 10 hane, 2'si ondalık
  price: number;

  @Column('boolean', { default: true }) // default değeri true
  isActive: boolean;

  @BeforeInsert()
  logToInsertBefore() {
    console.log('Yeni bir ürün ekleniyor:', this.name);
  }
  @AfterInsert()
  logToInsertAfter() {
    console.log('Yeni bir ürün eklendi:', this.name);
  }
  @BeforeUpdate()
  logToUpdate() {
    console.log('Bir ürün güncelleniyor:', this.name);
  }
  @AfterUpdate()
  logToUpdateAfter() {
    console.log('Bir ürün güncellendi:', this.name);
  }
}
