import { IsNotEmpty, Matches, MinLength } from "class-validator";

export class ShowDto {
  @IsNotEmpty({ message: 'provide a name of the show, please' })
  name: string;

  @IsNotEmpty({ message: 'provide a description for the show, please' })
  @MinLength(50)
  description: string;

  // @Matches('^(https?|ftp)://[^\s/$.?#].[^\s]*$')
  image: string;
}
