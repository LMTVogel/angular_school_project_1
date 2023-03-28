import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type ConcertDocument = Band & Document;

@Schema()
export class Band {
    @Prop({
        index: true,
        default: uuid
    })
    id!: string;

    @Prop({ required: true })
    name!: string;
}

export const BandSchema = SchemaFactory.createForClass(Band);
