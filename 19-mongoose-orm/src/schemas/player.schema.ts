import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
    @Prop({
        required: true,
    })
    name: string;

    @Prop()
    age: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
