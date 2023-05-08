import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../Schemas/User.schema";
import { JwtPayload } from "../Interfaces/jwt-payload.interface";
import mongoose from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {
    super({
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(
    { userName }: JwtPayload,
  ): Promise<User> {
    const user: User = await this.userModel.findOne({ userName });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}