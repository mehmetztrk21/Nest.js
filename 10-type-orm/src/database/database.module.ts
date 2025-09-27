import { Module } from '@nestjs/common';
import { msyqlProvider } from './database.provider';

@Module({
  providers: [msyqlProvider], //postgresProvider
  exports: [msyqlProvider], //postgresProvider
})
export class DatabaseModule {}
