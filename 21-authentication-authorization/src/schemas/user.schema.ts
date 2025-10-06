import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({
        required: true,
        unique: true,
        maxLength: 50,
        minLength: 2,
        trim: true,
    })
    username: string;
    @Prop({
        required: true,
        maxLength: 100,
        minLength: 6,
    })
    password: string;

    @Prop({
        required: false,
        maxLength: 50,
        minLength: 2,
        trim: true,
    })
    fullName: string;

    @Prop({
        required: false,
        trim: true,
    })
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);