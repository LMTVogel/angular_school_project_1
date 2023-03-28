import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import {Concert} from "./concert.schema";
import {User} from "../../user/user.schema";

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

    // Misschien dat ik hier de datum nog neer moet zetten. Maar we kunnen hem ook gewoon
    // uit het concert schema halen.
}
