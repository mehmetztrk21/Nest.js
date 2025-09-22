import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CustomconfigService } from './customconfig/customconfig.service';
import { PropertyService } from './property/property.service';
import { MessageService } from './message/message.service';
import { DB_CONNECTION } from './database/database.provider';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('CUSTOMER_CONFIG') private config,
    @Inject('PATH_CONFIG') private pathConfig,
    @Inject('LOG_CONFIG') private logConfig,
    @Inject('WRITE') private writerService, // string token
    @Inject(DB_CONNECTION) private databaseService, // symbol token
    private messageService: MessageService, // class token 
    private customConfigService: CustomconfigService,
  ) { }
  @Inject(PropertyService) // bu şekilde de inject edebiliriz. Buna property injection denir.
  private readonly propertyService: PropertyService
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    console.log('Module initialized', this.config);
    console.log('Path Config:', this.pathConfig);
    console.log('Log Config:', this.logConfig);
    console.log('Custom Config:', this.customConfigService.getCustomConfig());
    this.databaseService.connect();
    this.writerService.writeLog('This is a log message from AppService.');
    this.propertyService.logProperty();
    this.messageService.sendMessage('Hello via multiple handlers!');
  }
}
