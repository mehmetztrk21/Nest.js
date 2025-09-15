import { Injectable } from '@nestjs/common';
export interface IGlobalService {
  getGlobalConfig: () => string;
}
@Injectable()
export class GlobalService implements IGlobalService {
  getGlobalConfig(): string {
    return 'This is a global configuration';
  }
}
