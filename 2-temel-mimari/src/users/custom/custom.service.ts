import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomService {
  private users: string[] = ['Alice', 'Bob', 'Charlie'];

  getAllUsers(): string[] {
    return this.users;
  }
  addUser(name: string): void {
    this.users.push(name);
  }
}
