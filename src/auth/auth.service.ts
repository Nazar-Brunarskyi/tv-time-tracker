import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCredentialsDto } from './DTO/userCredentials.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/User.schema';
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './Interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
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
  ): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ userName });

    if (!user) {
      throw new NotFoundException('the user is not found');
    }

    const hashedPassword = user.password;
    const isThePasswordRight = await bcrypt.compare(password, hashedPassword);

    if (!isThePasswordRight) {
      throw new UnauthorizedException('please check your login credentials')
    }

    const payload: JwtPayload = { userName };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
