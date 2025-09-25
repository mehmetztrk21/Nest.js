import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentDto } from 'dtos/student.dto';

@Controller('student')
export class StudentController {

    @Get()
    getStudents(): string {
        return 'All Students';
    }

    @Post()
    @UsePipes(new ValidationPipe({
        errorHttpStatusCode: 400,
        whitelist: true,
        transform: true
    }))
    createStudent(@Body() studentDto: StudentDto): any {
        console.log('Student created', studentDto);
        return {
            message: 'Student created',
            student: studentDto
        }
    }
}
