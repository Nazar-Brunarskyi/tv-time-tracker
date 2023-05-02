import { Injectable } from '@nestjs/common';
import { UserCredentialsDto } from './DTO/userCredentials.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/User.schema';
import * as mongoose from 'mongoose'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) { }
  signUp(
    { password, userName }: UserCredentialsDto,
  ) {
    const newUser = new this.userModel({
      userName,
      password,
    });

    return newUser.save();
  }
}
