import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './user_profile.entity';
import { Post } from './post.entity';

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

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true }) //cascade: true ile user oluşturulurken profile da oluşturulur
  @JoinColumn() //user tablosunda profileId kolonu oluşur. Eğer Profile entity'sinde JoinColumn olsaydı profile tablosunda userId kolonu oluşurdu
  profile: Profile;

  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post[];
}
