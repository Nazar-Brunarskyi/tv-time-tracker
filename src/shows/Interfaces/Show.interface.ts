import { User } from 'src/auth/Schemas/User.schema';
import { Season } from './Season.interface';

export interface Show {
  name: string;
  image: string;
  description: string;
  seasons: Season[];
  createdBy: User;
}
