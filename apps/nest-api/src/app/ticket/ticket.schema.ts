import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import {Concert} from "../concert/schemas/concert.schema";
import {User} from "../user/user.schema";

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({
        index: true,
        default: uuid
    })
    id!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({
      required: true,
      type: MongooseSchema.Types.ObjectId,
      ref: 'Concert'
    })
    concert!: Concert;

    @Prop({
      required: true,
      type: MongooseSchema.Types.ObjectId,
      ref: 'User'
    })
    user!: User;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
