import { Schema, Prop, SchemaFactory,  } from '@nestjs/mongoose';

@Schema()
export class Test {
  @Prop()
  title: string;

  @Prop()
  description: string
}


export const TestSchema = SchemaFactory.createForClass(Test)
