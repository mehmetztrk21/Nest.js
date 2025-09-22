import { Injectable, Optional } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository, @Optional() private readonly emailService?: MailService) { }
  getAllStudents(): string[] {
    return this.studentRepository.getAllStudents();
  }
  addStudent(name: string): void {
    this.studentRepository.addStudent(name);
  }
  deleteStudent(name: string): void {
    this.studentRepository.deleteStudent(name);
  }
  notifyStudentAdded(name: string): void {
    if (this.emailService) {
      this.emailService.sendEmail('student@example.com', 'New Student Added', `A new student named ${name} has been added.`);
    }
  }
}
