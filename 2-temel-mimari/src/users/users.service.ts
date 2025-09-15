import { Inject, Injectable } from '@nestjs/common';
import { GlobalService } from 'src/global/global.service';
import type { IGlobalService } from 'src/global/global.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('CONFIG_OPTIONS') private config,
    @Inject(GlobalService) private globalService: IGlobalService,
  ) {}
  testConfig() {
    console.log('Global Config:', this.globalService.getGlobalConfig());
    console.log(this.config);
  }
  getUserById(id: number): { id: number; name: string } {
    return { id, name: `User${id}` };
  }
}
