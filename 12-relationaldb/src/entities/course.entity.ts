import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
}
