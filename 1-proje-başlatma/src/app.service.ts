import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class AppService
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  onModuleInit() {
    // ilk bu çalışır.
    console.log('Module initialized');
  }
  onApplicationBootstrap() {
    // sonra bu çalışır
    console.log('Application bootstrapped');
  }
  onApplicationShutdown(signal?: string) {
    // uygulama kapanırken çalışır
    console.log(`Application shutdown due to: ${signal}`);
  }
  onModuleDestroy() {
    //module kapatılırken çalışır
    console.log('Module is being destroyed');
  }
  getHello(): string {
    return 'Hello World!';
  }
  getSayHi(): string {
    return 'Hi';
  }
  sayMyName(name: string): string {
    return `My name is ${name}`;
  }
}
