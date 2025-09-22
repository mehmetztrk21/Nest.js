import { Test, TestingModule } from '@nestjs/testing';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

//npx jest src/students/students.service.spec.ts
/*
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.231 s, estimated 1 s
*/

describe('StudentService', () => {
  let service: StudentService;
  let studentRepo: StudentRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService, {
        provide: StudentRepository,
        useValue: {
          getAllStudents: jest.fn(),
          addStudent: jest.fn(),
          deleteStudent: jest.fn()
        },
      }
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    studentRepo = module.get<StudentRepository>(StudentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call getAllStudents from repository', async () => {
    await service.getAllStudents();
    expect(studentRepo.getAllStudents).toHaveBeenCalled();
  });
  it('should call addStudent from repository', async () => {
    const student = "Alice";
    await service.addStudent(student);
    expect(studentRepo.addStudent).toHaveBeenCalledWith(student);
  });
  it('should call deleteStudent from repository', async () => {
    const studentName = 'John Doe';
    await service.deleteStudent(studentName);
    // “Bu mock fonksiyon test sırasında çağrılmış mı, hem de "John Doe" parametresiyle çağrılmış mı?”
    expect(studentRepo.deleteStudent).toHaveBeenCalledWith(studentName);
  });
});
