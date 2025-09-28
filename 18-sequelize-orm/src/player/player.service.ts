import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePlayerDto } from 'src/dtos/create.player.dto';
import { Player } from 'src/entities/player.entity';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class PlayerService {
    constructor(
        @InjectModel(Player) private playerModel: typeof Player, //Modeli enjekte ettik
    ) { }

    async createPlayer(player: CreatePlayerDto): Promise<Player> {
        const newPlayer = await this.playerModel.create(
            player as CreationAttributes<Player>,
        );
        return newPlayer;
    }

    async findAllPlayers(): Promise<Player[]> {
        const players = await this.playerModel.findAll();
        return players;
    }

    async findPlayerById(id: number): Promise<Player | null> {
        const player = await this.playerModel.findByPk(id);
        return player;
    }

    async updatePlayer(
        id: number,
        name: string,
        age: number,
    ): Promise<Player | null> {
        const player = await this.playerModel.findByPk(id);
        if (!player) throw new Error('Player not found');
        player.name = name;
        player.age = age;
        await player.save();
        return player;
    }

    async deletePlayer(id: number): Promise<void> {
        const player = await this.playerModel.findByPk(id);
        if (!player) throw new Error('Player not found');
        await player.destroy();
    }
}
