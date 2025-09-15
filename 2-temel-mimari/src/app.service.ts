import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('CUSTOMER_CONFIG') private config,
    @Inject('PATH_CONFIG') private pathConfig,
    @Inject('LOG_CONFIG') private logConfig,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    console.log('Module initialized', this.config);
    console.log('Path Config:', this.pathConfig);
    console.log('Log Config:', this.logConfig);
  }
}
