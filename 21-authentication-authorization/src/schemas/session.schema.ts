import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type SessionDocument = HydratedDocument<Session>;

@Schema({
    timestamps: true
})
export class Session {
    @Prop({ required: true, type: String })
    sessionId: string;
    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
    userId: string

    @Prop({ required: false, type: Object })
    data: Record<string, any>;

    @Prop({ required: false })
    expiresAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);