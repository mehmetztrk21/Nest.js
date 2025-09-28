import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './user_profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true, //veya spesifik olarak ['insert', 'update'] da yazılabilir. Kod seviyesinde çalışır.
    eager: false,
    lazy: true,
    onDelete: 'CASCADE', //veritabanı seviyesinde çalışır. User silindiğinde ilişkili Profile'ı da siler
    orphanedRowAction: 'delete', //user ile ilişkisi kesilen profile'ı siler. Yani user.profile = null yaparsak profile silinir
  })
  //lazy:true ile user sorgulandığında profile gelmez. profile'a ihtiyaç olduğunda user.profile.then() ile getirilir.
  //cascade: true ile user oluşturulurken profile da oluşturulur
  @JoinColumn() //user tablosunda profileId kolonu oluşur. Eğer Profile entity'sinde JoinColumn olsaydı profile tablosunda userId kolonu oluşurdu
  profile: Profile;
}
