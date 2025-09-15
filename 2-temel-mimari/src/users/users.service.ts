import { Inject, Injectable } from '@nestjs/common';
import { GlobalService } from 'src/global/global.service';
import type { IGlobalService } from 'src/global/global.service';
import { CustomService } from './custom/custom.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('CONFIG_OPTIONS') private config,
    @Inject(GlobalService) private globalService: IGlobalService,
    @Inject(CustomService) private customService: CustomService,
  ) {}
  testConfig() {
    console.log('Global Config:', this.globalService.getGlobalConfig());
    console.log(this.config);
  }
  getUserById(id: number): { id: number; name: string } {
    return { id, name: `User${id}` };
  }
  getAllUsers(): string[] {
    return this.customService.getAllUsers();
  }
  addUser(name: string): void {
    this.customService.addUser(name);
  }
}
