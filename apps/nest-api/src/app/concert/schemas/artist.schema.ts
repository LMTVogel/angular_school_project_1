import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {Band} from "./band.schema";

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: false })
    band!: Band;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
