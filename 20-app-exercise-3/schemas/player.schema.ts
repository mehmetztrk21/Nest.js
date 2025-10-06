import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose } from "mongoose";

import * as mongoose from 'mongoose';
export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
    @Prop({
        required: true,
        maxLength: 50,
        minLength: 2,
        trim: true,
    })
    name: string;
    @Prop({
        required: true,
        type: mongoose.Schema.Types.Number
    })
    age: number;
    @Prop({
        required: true,
        maxLength: 30,
        minLength: 2,
        trim: true,
    })
    position: string;
    @Prop({
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    })
    team: mongoose.Types.ObjectId;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);