import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from 'src/schemas/player.schema';

@Injectable()
export class PlayerService {
    constructor(
        @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    ) { }

    async create(name: string, age: number): Promise<Player> {
        const newPlayer = new this.playerModel({ name, age });
        return newPlayer.save();
    }
    async findAll(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }
    async findOne(id: string): Promise<Player | null> {
        return this.playerModel.findById(id).exec();
    }
    async delete(id: string): Promise<Player | null> {
        return this.playerModel.findByIdAndDelete(id).exec();
    }
    async update(id: string, name: string, age: number): Promise<Player | null> {
        return this.playerModel
            .findByIdAndUpdate(id, { name, age }, { new: true })
            .exec();
    }

    async getAllWithPagination(page: number, limit: number): Promise<any> {
        const skip = (page - 1) * limit;
        const totalCount = await this.playerModel.countDocuments();
        const players = await this.playerModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec();

        return {
            data: players,
            page: page,
            limit: limit,
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / limit),
        };
    }
}
