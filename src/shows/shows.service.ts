import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Show } from './Schemas/Show.scema';
import mongoose from 'mongoose';
import { ShowDto } from './DTOs/show.dto';

@Injectable()
export class ShowsService {
  constructor(
    @InjectModel(Show.name)
    private showModel: mongoose.Model<Show>
  ) {}
  getShows() {
    return this.showModel.find()
  }

  createShow(
    {name, description, image}: ShowDto,
  ) {

  }
}
