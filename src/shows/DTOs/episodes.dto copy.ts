import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Episode } from '../Interfaces/Episode.interface';
import { EpisodeDto } from './episode.dto';
import { Type } from 'class-transformer';

export class EpisodesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EpisodeDto)
  episodes: Episode[];
}
