import { IsNotEmpty, MinLength } from "class-validator";

export class UserCredentialsDto {
  @IsNotEmpty({ message: 'provide a userName, please' })
  @MinLength(4)
  userName: string;

  @IsNotEmpty({ message: 'provide a password, please' })
  @MinLength(8)
  password: string;
}