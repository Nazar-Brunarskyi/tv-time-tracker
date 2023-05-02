import { IsNotEmpty } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty({ message: 'provide a title, please' })
  title: string;

  @IsNotEmpty({ message: 'provide a description, please' })
  description: string;
}