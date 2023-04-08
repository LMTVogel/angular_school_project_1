import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ConcertLocationDocument = ConcertLocation & Document;

@Schema()
export class ConcertLocation {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    streetAddress!: string;

    @Prop({ required: true })
    zipCode!: string;

    @Prop({ required: true })
    city!: string;

    @Prop({ required: true })
    country!: string;
}

export const ConcertLocationSchema = SchemaFactory.createForClass(ConcertLocation);
