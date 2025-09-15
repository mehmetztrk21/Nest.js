import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CustomconfigService {
  constructor(@Inject('CUSTOM_CONFIG') private config) {}
  getCustomConfig() {
    return this.config;
  }
}
