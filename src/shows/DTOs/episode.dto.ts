import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class EpisodeDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(50)
  description: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsOptional()
  @IsString()
  image?: string;
}
