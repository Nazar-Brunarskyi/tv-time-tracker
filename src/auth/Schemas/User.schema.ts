import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ unique: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  hash: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
