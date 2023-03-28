import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

export type VenueDocument = Venue & Document;

@Schema()
export class Venue {
    @Prop({
        index: true,
        default: uuid
    })
    id!: string;

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

export const VenueSchema = SchemaFactory.createForClass(Venue);
