import { Check, Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity({
    name: 'users', // tablo adı
    orderBy: {
        id: 'ASC', // id'ye göre artan sırala
        createdAt: 'DESC', // createdAt'a göre azalan sırala
    },
})
@Index(['firstName', 'lastName']) // composite index
export class User extends BaseEntity {
    @Column('varchar', { length: 100 })
    firstName: string;

    @Column('varchar', { length: 100, name: 'lastName' })
    lastName: string;

    @Column('varchar', { unique: true, length: 100 })
    email: string;

    @Column('int', { nullable: true }) // nullable:true yaparsak bu kolon null olabilir
    @Check('age >= 0') // age kolonu 0'dan küçük olamaz
    age: number;
}
