import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { Student } from 'src/entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Course,Student])],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
