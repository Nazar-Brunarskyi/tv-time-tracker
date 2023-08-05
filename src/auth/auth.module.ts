import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Schemas/User.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAtStrategy } from './Strategies/at.startegy';
import { JwtRtStrategy } from './Strategies/rt.startegy';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, JwtAtStrategy, JwtRtStrategy],
  controllers: [AuthController],
  exports: [JwtAtStrategy, PassportModule],
})
export class AuthModule {}
