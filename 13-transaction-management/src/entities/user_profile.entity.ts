import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    bio: string;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    user: User;
}
