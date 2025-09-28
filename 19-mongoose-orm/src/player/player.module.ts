import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from 'src/schemas/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  providers: [PlayerService],
  controllers: [PlayerController],
})
export class PlayerModule { }
