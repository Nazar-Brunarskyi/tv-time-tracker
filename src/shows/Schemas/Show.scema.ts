import { Schema, Prop, SchemaFactory, } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/Schemas/User.schema';
@Schema()
export class Show {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  createdBy: User
}

export const ShowSchema = SchemaFactory.createForClass(Show)

