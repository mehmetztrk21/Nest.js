import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    studentNumber: string;

    @Column()
    age: number;

    @ManyToMany(() => Course, (course) => course.students)
    @JoinTable({
        name: 'student_courses',
        joinColumn: { name: 'studentId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'courseId', referencedColumnName: 'id' },
    })
    courses: Course[];
}
