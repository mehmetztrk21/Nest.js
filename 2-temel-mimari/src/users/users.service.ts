import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@Inject('CONFIG_OPTIONS') private config) {}
  testConfig() {
    console.log(this.config);
  }
  getUserById(id: number): { id: number; name: string } {
    return { id, name: `User${id}` };
  }
}
