import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserCredentialsDto } from './DTO/userCredentials.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/User.schema';
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) { }

  async signUp(
    { password, userName }: UserCredentialsDto,
  ): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new this.userModel({
        userName,
        password: hashedPassword,
      });

      await newUser.save();

      return newUser
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('user with such name already exist');
      }
    }
  }

  async signIn(
    { userName, password }: UserCredentialsDto,
  ) {
    const user = await this.userModel.findOne({ userName });

    if (!user) {
      throw new NotFoundException('the user is not found');
    }

    const hashedPassword = user.password;
    const isThePasswordRight = await bcrypt.compare(password, hashedPassword);

    if (!isThePasswordRight) {
      throw new ConflictException('password is uncorrect')
    }

    return user;
  }
}
