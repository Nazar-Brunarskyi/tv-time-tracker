import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './DTOs/userCredentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Decorators/getUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('/signup')
  signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<any> {
    return this.authServise.signUp(userCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.authServise.signIn(userCredentialsDto);
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  logOut(@GetUser() user) {
    return this.authServise.logOut(user.userName);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  refreshTokens(@GetUser() user) {
    return this.authServise.refreshTokens(user.userName, user.refreshToken);
  }
}
