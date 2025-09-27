import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from 'src/dtos/create.course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private courseRepository: Repository<Course>,
    ) { }

    async createCourse(CreateCourseDto: CreateCourseDto): Promise<Course> {
        const { title, description } = CreateCourseDto;
        console.log(CreateCourseDto);
        const course = this.courseRepository.create({
            title,
            description,
            students: [],
        });
        return await this.courseRepository.save(course);
    }

    async getCourses(): Promise<Course[]> {
        return await this.courseRepository.find();
    }

    async getCourseById(id: string): Promise<Course> {
        const course = await this.courseRepository.findOneBy({ id });
        if (!course) {
            throw new NotFoundException('Course not found');
        }
        return course;
    }

    async updateCourse(
        id: string,
        title?: string,
        description?: string,
    ): Promise<Course> {
        await this.courseRepository.update(id, { title, description });
        return this.getCourseById(id);
    }

    async deleteCourse(id: string): Promise<void> {
        await this.courseRepository.delete(id);
    }
}
