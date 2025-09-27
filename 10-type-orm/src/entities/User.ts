import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({
  name: 'users', // tablo adı
  orderBy: {
    id: 'ASC', // id'ye göre artan sırala
    createdAt: 'DESC', // createdAt'a göre azalan sırala
  },
})
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
