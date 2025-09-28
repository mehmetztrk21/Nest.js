import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Player } from 'src/entities/player.entity';

@Module({
  imports: [SequelizeModule.forFeature([Player])],
  providers: [PlayerService],
  controllers: [PlayerController],
})
export class PlayerModule { }
