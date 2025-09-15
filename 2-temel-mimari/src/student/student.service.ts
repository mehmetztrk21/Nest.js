import { Injectable } from '@nestjs/common';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}
  getAllStudents(): string[] {
    return this.studentRepository.getAllStudents();
  }
  addStudent(name: string): void {
    this.studentRepository.addStudent(name);
  }
  deleteStudent(name: string): void {
    this.studentRepository.deleteStudent(name);
  }
}
