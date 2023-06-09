import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Episode } from '../Interfaces/Episode.interface';
import mongoose from 'mongoose';
import { Show } from './Show.scema';

@Schema()
export class Season {
  @Prop({ required: true, default: [] })
  episodes: Episode[];

  @Prop({ required: true })
  numberOfTheSeason: number

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true,
  })
  ownedByShow: Show
}

export const SeasonSchema = SchemaFactory.createForClass(Season)

