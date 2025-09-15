import { Module } from '@nestjs/common';

@Module({})
export class PathModule {
  static register(path: string) {
    return {
      module: PathModule,
      providers: [
        {
          provide: 'PATH_CONFIG',
          useValue: { path },
        },
      ],
      exports: ['PATH_CONFIG'],
    };
  }
}
