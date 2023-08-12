import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/Schemas/User.schema';
import { Season } from '../Interfaces/Season.interface';

@Schema()
export class Show {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Season' }],
    default: [],
  })
  seasons?: Season[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: User;
}

export const ShowSchema = SchemaFactory.createForClass(Show);
