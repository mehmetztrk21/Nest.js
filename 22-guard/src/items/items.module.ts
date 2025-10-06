import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [JwtModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule { }
