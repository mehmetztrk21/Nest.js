import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'schemas/team.schema';

@Injectable()
export class TeamService {
    constructor(
        @InjectModel(Team.name) private teamModel: Model<Team>
    ) { }

    async findAll(): Promise<Team[]> {
        return this.teamModel.find().exec();
    }

    async findOne(id: string): Promise<Team | null> {
        return this.teamModel.findById(id).exec();
    }

    async create(team: Team): Promise<Team> {
        const newTeam = new this.teamModel(team);
        return newTeam.save();
    }

    async update(id: string, team: Team): Promise<Team | null> {
        return this.teamModel.findByIdAndUpdate(id, team, { new: true }).exec();
    }

    async delete(id: string): Promise<Team | null> {
        return this.teamModel.findByIdAndDelete(id).exec();
    }
}
