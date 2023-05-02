import { Schema, Prop, SchemaFactory, } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  userName: string;

  @Prop()
  password: string;
}


export const UserSchema = SchemaFactory.createForClass(User)
