import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Episode } from '../Interfaces/Episode.interface';

@Schema()
export class Season {
  @Prop({ required: true, default: [] })
  episodes: Episode[];

  @Prop({ required: true })
  numberOfTheSeason: number;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);