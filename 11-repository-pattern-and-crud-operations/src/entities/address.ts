//embedded entity
import { Column } from 'typeorm';

export class Address {
  @Column('varchar', { length: 100 })
  street: string;

  @Column('varchar', { length: 50, name: 'city' })
  city: string;

  @Column('varchar', { length: 50 })
  state: string;

  @Column('varchar', { length: 20 })
  zipCode: string;
}
