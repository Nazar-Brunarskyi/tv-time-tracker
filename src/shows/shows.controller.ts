import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowDto } from './DTOs/show.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Decorators/getUser.decorator';
// eslint-disable-next-line max-len
import { CanCreateAnEpisodeGuard } from './guards/can-create-an-episode/can-create-an-episode.guard';
import { SeasonDto } from './DTOs/season.dto';
import { GetShowId } from 'src/Decorators/getShowId.decorator';
import { EpisodesDto } from './DTOs/episodes.dto copy';

@Controller('shows')
export class ShowsController {
  constructor(private showsService: ShowsService) { }
  @Get()
  getShows() {
    return this.showsService.getShows();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createShow(@Body() showDto: ShowDto, @GetUser() user) {
    return this.showsService.createShow(showDto, user);
  }

  @Post('createSeason/:showId/')
  @UseGuards(AuthGuard('jwt'), CanCreateAnEpisodeGuard)
  createSeason(@Body() season: SeasonDto, @GetShowId() showId: string) {
    return this.showsService.createSeason(season, showId);
  }

  @Post('addEpisodes/:showId/:numberOfTheSeason')
  @UseGuards(AuthGuard('jwt'), CanCreateAnEpisodeGuard)
  addEpisodes(
    @GetShowId() showId: string,
    @Param('numberOfTheSeason') numberOfTheSeason: string,
    @Body() episodes: EpisodesDto
  ) {
    return this.showsService.addEpisodes(showId, +numberOfTheSeason, episodes);
  }
}
