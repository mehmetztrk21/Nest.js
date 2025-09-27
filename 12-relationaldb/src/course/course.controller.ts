import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Body,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { UpdateCourseDto } from 'src/dtos/update.course.dto';
import { CreateCourseDto } from 'src/dtos/create.course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get()
    async getCourses() {
        return this.courseService.getCourses();
    }

    @Get(':id')
    async getCourseById(@Param('id') id: string) {
        return this.courseService.getCourseById(id);
    }

    @Post()
    async createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    }

    @Put(':id')
    async updateCourse(
        @Param('id') id: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        const { title, description } = updateCourseDto;
        return this.courseService.updateCourse(id, title, description);
    }

    @Delete(':id')
    async deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }
}
