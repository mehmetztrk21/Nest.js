import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentWithCourseDto } from 'src/dtos/create.studentCourse.dto';
import { Course } from 'src/entities/course.entity';
import { Student } from 'src/entities/student.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
        @InjectRepository(Course) private courseRepository: Repository<Course>,
    ) { }

    async createStudentWithCourse(
        dto: CreateStudentWithCourseDto,
    ): Promise<Student> {
        const { name, surname, studentNumber, age, courseIds } = dto;
        const courses = await this.courseRepository.findBy({
            id: In([...courseIds]),
        });
        if (!courses) throw new NotFoundException('Courses not found');

        const student = this.studentRepository.create({
            name,
            surname,
            studentNumber,
            age,
            courses,
        });
        return await this.studentRepository.save(student);
    }
    async getStudents(): Promise<Student[]> {
        return await this.studentRepository.find({ relations: ['courses'] });
    }

    async getStudentById(id: string): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: { id },
            relations: ['courses'],
        });
        if (!student) throw new NotFoundException('Student not found');
        return student;
    }

    async updateStudent(
        id: string,
        dto: CreateStudentWithCourseDto,
    ): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: { id },
            relations: ['courses'],
        });
        if (!student) throw new NotFoundException('Student not found');

        const courses = await this.courseRepository.findBy({
            id: In([...dto.courseIds]),
        });
        student.courses = courses;
        Object.assign(student, dto);
        return await this.studentRepository.save(student);
    }

    async deleteStudent(id: string): Promise<void> {
        await this.studentRepository.delete(id);
    }
}
