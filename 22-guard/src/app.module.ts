import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [ItemsModule, PackagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
