import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('say-hi')
  getSayHi(): string {
    return this.appService.getSayHi();
  }
  @Get('say-my-name')
  sayMyName(@Query('name') name: string): string {
    return this.appService.sayMyName(name);
  }
}
