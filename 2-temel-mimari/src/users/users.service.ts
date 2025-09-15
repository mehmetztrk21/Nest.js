import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserById(id: number): { id: number; name: string } {
    return { id, name: `User${id}` };
  }
}
