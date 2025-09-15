import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class ConfigModule {
  static forRoot(env: 'dev' | 'prod'): DynamicModule {
    //dinamik modül bu şekilde oluşturulur
    const isDev = env === 'dev';
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: {
            dbConnectionString: isDev
              ? 'mongodb://localhost/dev-db'
              : 'mongodb://localhost/prod-db',
            debug: isDev,
          },
        },
      ],
      exports: ['CONFIG_OPTIONS'],
    };
  }
}
