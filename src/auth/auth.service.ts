import { UserCredentialsDto } from './DTOs/userCredentials.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/User.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './Interfaces/tokens.interface';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({
    password,
    userName,
    email,
  }: UserCredentialsDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const UUID = new mongoose.mongo.ObjectId();
      const tokens = await this.generateTokens(UUID, userName);

      const newUser = new this.userModel({
        _id: UUID,
        userName,
        password: hashedPassword,
        hash: tokens.REFRESH_TOKEN,
        email,
      });

      await newUser.save();

      return tokens;
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        throw new ConflictException('user with such name already exist');
      }
    }
  }

  async signIn({ userName, password }: UserCredentialsDto): Promise<Tokens> {
    const user = await this.userModel.findOne({ userName });

    if (!user) {
      throw new NotFoundException('the user is not found');
    }

    const hashedPassword = user.password;
    const isThePasswordRight = await bcrypt.compare(password, hashedPassword);

    if (!isThePasswordRight) {
      throw new UnauthorizedException('please check your login credentials');
    }

    const tokens = await this.generateTokens(user._id, user.userName);

    user.hash = tokens.REFRESH_TOKEN;

    await user.save();

    return tokens;
  }

  async logOut(userName: string) {
    const user = await this.userModel.findOne({ userName });

    user.hash = null;
    await user.save();
  }

  async refreshTokens(userName: string, refreshToken: string) {
    const user = await this.userModel.findOne({ userName });

    if (!user) {
      throw new NotFoundException('the user is not found');
    }

    if (user.hash === null) {
      throw new ForbiddenException('Access Denied');
    }

    const doTokensMatch = refreshToken === user.hash;

    if (!doTokensMatch) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user._id, user.userName);

    user.hash = tokens.REFRESH_TOKEN;

    await user.save();

    return tokens;
  }

  async generateTokens(
    id: mongoose.mongo.BSON.ObjectId,
    userName: string,
  ): Promise<Tokens> {
    return {
      ACCESS_TOKEN: await this.jwtService.signAsync(
        {
          id: id,
          userName,
        },
        {
          expiresIn: 60 * 15,
          secret: process.env.AT_SECRET,
        },
      ),

      REFRESH_TOKEN: await this.jwtService.signAsync(
        {
          id: id,
          userName,
        },
        {
          expiresIn: 60 * 60,
          secret: process.env.RT_SECRET,
        },
      ),
    };
  }
}
