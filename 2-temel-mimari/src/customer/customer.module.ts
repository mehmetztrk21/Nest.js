import { Module } from '@nestjs/common';

@Module({})
export class CustomerModule {
  static forFeature() {
    // spesifik konfigürasyon için static method
    return {
      module: CustomerModule,
      providers: [
        {
          provide: 'CUSTOMER_CONFIG',
          useValue: { role: 'admin' },
        },
      ],
      exports: ['CUSTOMER_CONFIG'],
    };
  }
}
