import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from './base.entity';

@Entity()
export class Country extends MyBaseEntity {
  @Column('varchar', { length: 100 })
  name: string;
}
