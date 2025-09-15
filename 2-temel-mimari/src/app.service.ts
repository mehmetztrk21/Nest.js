import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CustomconfigService } from './customconfig/customconfig.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('CUSTOMER_CONFIG') private config,
    @Inject('PATH_CONFIG') private pathConfig,
    @Inject('LOG_CONFIG') private logConfig,
    private customConfigService: CustomconfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    console.log('Module initialized', this.config);
    console.log('Path Config:', this.pathConfig);
    console.log('Log Config:', this.logConfig);
    console.log('Custom Config:', this.customConfigService.getCustomConfig());
  }
}
