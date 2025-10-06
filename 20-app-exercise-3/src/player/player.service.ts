import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'schemas/player.schema';
import { PlayerDto } from 'src/dtos/player.dto';
import * as  mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class PlayerService {

    constructor(
        @InjectModel(Player.name) private playerModel: Model<Player>
    ) { }

    async findAll(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }

    async findOne(id: string): Promise<PlayerDto | null> {
        // return this.playerModel.aggregate([
        //     { $match: { _id: new ObjectId(id) } },
        //     {
        //         $lookup: {
        //             from: 'teams',
        //             localField: 'team',
        //             foreignField: '_id',
        //             as: 'teamDetails'
        //         }
        //     },
        //     { $unwind: { path: '$teamDetails', preserveNullAndEmptyArrays: true } },
        //     {
        //         $project: {
        //             _id: 1,
        //             name: 1,
        //             age: 1,
        //             position: 1,
        //             teamId: '$teamDetails._id',
        //             teamName: '$teamDetails.name'
        //         }
        //     }
        // ]).exec().then(results => results[0] || null);

        //veya 

        const player: any = await this.playerModel.findById(id).populate({ path: 'team', select: "name" }).exec();
        console.log(player);
        if (!player) return null;
        const playerDto: PlayerDto = {
            name: player.name,
            age: player.age,
            position: player.position,
            teamId: player.team?._id.toString(),
            teamName: player.team ? player.team.name : undefined
        };
        return playerDto;
    }
    async create(player: Player): Promise<Player> {
        const newPlayer = new this.playerModel(player);
        return newPlayer.save();
    }

    async update(id: string, player: Player): Promise<Player | null> {
        return this.playerModel.findByIdAndUpdate(id, player, { new: true }).exec();
    }

    async delete(id: string): Promise<Player | null> {
        return this.playerModel.findByIdAndDelete(id).exec();
    }

    async findByTeam(teamId: string): Promise<Player[]> {
        return this.playerModel.find({ team: teamId }).exec();
    }
}
