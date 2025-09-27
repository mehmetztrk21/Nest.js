import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentWithCourseDto } from 'src/dtos/create.studentCourse.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Get()
    async getStudents() {
        return this.studentService.getStudents();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: string) {
        return this.studentService.getStudentById(id);
    }
    @Post()
    async createStudentWithCourse(@Body() dto: CreateStudentWithCourseDto) {
        return this.studentService.createStudentWithCourse(dto);
    }
    @Put(':id')
    async updateStudent(
        @Param('id') id: string,
        @Body() dto: CreateStudentWithCourseDto,
    ) {
        return this.studentService.updateStudent(id, dto);
    }

    @Delete(':id')
    async deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
    }
}
