import { Controller, Get } from '@nestjs/common';

@Controller('student')
export class StudentController {

    @Get()
    getStudents(): string {
        return 'All Students';
    }
}
