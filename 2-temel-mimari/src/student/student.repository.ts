import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentRepository {
  private students: string[] = ['John', 'Jane', 'Doe'];
  getAllStudents(): string[] {
    return this.students;
  }
  addStudent(name: string): void {
    this.students.push(name);
  }
  deleteStudent(name: string): void {
    this.students = this.students.filter((student) => student !== name);
  }
}
