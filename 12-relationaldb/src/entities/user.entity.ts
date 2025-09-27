import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
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
    cascade: true,
    eager: false,
    lazy: true,
  })
  //lazy:true ile user sorgulandığında profile gelmez. profile'a ihtiyaç olduğunda user.profile.then() ile getirilir.
  //cascade: true ile user oluşturulurken profile da oluşturulur
  @JoinColumn() //user tablosunda profileId kolonu oluşur. Eğer Profile entity'sinde JoinColumn olsaydı profile tablosunda userId kolonu oluşurdu
  profile: Profile;

  //eager:true ile user sorgulandığında profile da otomatik gelir. Serviste relations ile getirmeye gerek kalmaz. Çok tercih edilmez çünkü her zaman gerekli olmayabilir.
  @OneToMany(() => Post, (post) => post.author, { cascade: true, eager: true })
  posts: Post[];

  @Exclude()
  __profile__: Profile;

  @Exclude()
  __has_profile__: boolean;
}
