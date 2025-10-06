import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [AdminController]
})
export class AdminModule { }
