import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  imports: [MailModule]
})
export class StudentModule { }
