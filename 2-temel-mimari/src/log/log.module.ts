import { DynamicModule, Module } from '@nestjs/common';

const myAsyncFunc = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello from async function!');
    }, 1000);
  });
};

@Module({})
export class LogModule {
  static registerAsync(): DynamicModule {
    return {
      module: LogModule,
      providers: [
        {
          provide: 'LOG_CONFIG',
          useFactory: async () => {
            const isProd = true;
            const msg = await myAsyncFunc();
            console.log(msg);
            //async  await işlemleri yapılabilir.
            //dotenv.config() gibi async işlemler yapılabilir
            return {
              LOG_DB_NAME:
                process.env.LOG_DB_NAME || (isProd ? 'prod-logs' : 'dev-logs'),
            };
          },
        },
      ],
      exports: ['LOG_CONFIG'],
    };
  }
}
