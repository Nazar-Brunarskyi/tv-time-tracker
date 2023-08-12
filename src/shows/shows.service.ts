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
import { SeasonDto } from './DTOs/season.dto';
import { Season } from './Schemas/Season.scema';
import { EpisodesDto } from './DTOs/episodes.dto copy';

@Injectable()
export class ShowsService {
  constructor(
    @InjectModel(Show.name)
    private showModel: mongoose.Model<Show>,
    @InjectModel(Season.name)
    private seasonModel: mongoose.Model<Season>,
  ) { }
  getShows() {
    return this.showModel.find();
  }

  async createShow({ name, description }: ShowDto, user: User) {
    try {
      const newShow = new this.showModel({
        createdBy: user.id,
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

  async createSeason(season: SeasonDto, showId: string) {
    const show = await this.showModel.findById(showId);
    const { episodes } = season;

    const newSeason = new this.seasonModel({
      episodes,
      ownedByShow: show,
      numberOfTheSeason: 1,
    });

    await newSeason.save();

    show.seasons.push(newSeason);

    await show.save();

    return newSeason;
  }

  async addEpisodes(
    showId: string,
    numberOfTheSeason: number,
    episodesObj: EpisodesDto
  ) {
    const show = await this.showModel.findById(showId);
    const { episodes } = episodesObj;
    const seasonId = show.seasons[numberOfTheSeason - 1];

    const season = await this.seasonModel.findById(seasonId);

    season.episodes.push(...episodes);
    season.save();

    return show;
  }
}
