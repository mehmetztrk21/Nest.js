import { Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import type { Request, Response } from 'express';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  getAllStudents(@Res() response: Response) {
    const students = this.studentService.getAllStudents();
    response.status(200).json(students);
  }

  @Post()
  addStudent(@Req() request: Request, @Res() response: Response) {
    const { name } = request.body;
    this.studentService.addStudent(name);
    response.status(201).send('Student added');
  }

  @Delete()
  deleteStudent(@Req() request: Request, @Res() response: Response) {
    const { name } = request.body;
    this.studentService.deleteStudent(name);
    response.status(200).send('Student deleted');
  }
}
