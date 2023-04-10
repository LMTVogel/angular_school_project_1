import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import {Artist} from "./artist.schema";
import {ConcertLocation} from "./concertLocation.schema";

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {
    @Prop({
        index: true,
        default: uuid
    })
    id!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.Date
    })
    startDate!: MongooseSchema.Types.Date;

    @Prop({
        required: true,
    })
    maxTickets!: number;

    @Prop({
        required: true,
    })
    minimumAge!: number;

    @Prop({
        required: true,
        default: [],
    })
    artists: Artist[];

    @Prop({
        required: true,
    })
    location!: ConcertLocation;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
