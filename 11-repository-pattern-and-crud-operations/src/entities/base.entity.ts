import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
export abstract class MyBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('boolean', { default: false, select: false }) // select:false yaparsak bu kolon select sorgularında gelmez
  isDeleted: boolean;

  @DeleteDateColumn({ select: false }) // soft delete için kullanılır, select:false yaparsak bu kolon select sorgularında gelmez
  deletedAt: Date;

  @VersionColumn({ default: 1, select: false }) // optimistic locking için kullanılır. 2 kişi aynı veriyi güncellerse hata verir. select:false yaparsak bu kolon select sorgularında gelmez
  version: number;
}
