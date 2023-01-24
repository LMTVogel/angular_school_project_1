import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        index: true,
        default: uuid
    })
    id!: string;

    @Prop({ required: true })
    name!: string;
    
    @Prop({
        required: true,
        unique: true
    })
    email!: string;
    
    @Prop({
        required: true,
        default: Date.now,
        type: MongooseSchema.Types.Date
    })
    bday!: MongooseSchema.Types.Date;

    @Prop({
        required: true,
        default: false,
    })
    isAdmin!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);