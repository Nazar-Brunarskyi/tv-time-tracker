import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Show } from './Schemas/Show.scema';
import mongoose from 'mongoose';
import { ShowDto } from './DTOs/show.dto';
import { User } from 'src/auth/Schemas/User.schema';

@Injectable()
export class ShowsService {
  constructor(
    @InjectModel(Show.name)
    private showModel: mongoose.Model<Show>,
  ) {}
  getShows() {
    return this.showModel.find();
  }

  async createShow({ name, description }: ShowDto, user: User) {
    try {
      const newShow = new this.showModel({
        createdBy: user._id,
        name,
        description,
      });

      await newShow.save();

      return newShow;
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        throw new ConflictException('such show already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
