import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from 'src/schemas/session.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Session.name) private sessionModel: Model<Session>,
    ) { }

    async createSession(sessionId: string, data: any) {
        const newSession = new this.sessionModel({
            sessionId: sessionId,
            data: data,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 gün geçerli
        });
        return newSession.save();
    }

    async getSession(sessionId: string) {
        return this.sessionModel.findOne({ sessionId: sessionId }).exec();
    }

    async deleteSession(sessionId: string) {
        return this.sessionModel.deleteOne({ sessionId: sessionId }).exec();
    }
}
