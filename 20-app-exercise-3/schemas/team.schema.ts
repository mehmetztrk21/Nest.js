import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
    @Prop({
        required: true,
        maxLength: 50,
        minLength: 2,
        trim: true,
    })
    name: string;
    @Prop({
        required: true,
        maxLength: 50,
        minLength: 2,
        trim: true,
    })
    city: string;
    championshipsWon: number;
}


export const TeamSchema = SchemaFactory.createForClass(Team);