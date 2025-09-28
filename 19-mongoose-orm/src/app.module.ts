import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:admin@localhost:27018/nestjsMongoose?authSource=admin',
      {
        //...other options
      },
    ),
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
