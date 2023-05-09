import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/Schemas/User.schema';
import { Season } from './Season.scema';

@Schema()
export class Show {
  @Prop({ unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Season' }],
    default: []
  })
  seasons?: Season[]

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  createdBy: User
}

export const ShowSchema = SchemaFactory.createForClass(Show)
