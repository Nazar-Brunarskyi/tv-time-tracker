import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './DTOs/userCredentials.dto';
import { User } from './Schemas/User.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Decorators/getUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authServise: AuthService
  ) { }

  @Post('/signup')
  signUp(
    @Body() userCredentialsDto: UserCredentialsDto
  ): Promise<any> {
    return this.authServise.signUp(userCredentialsDto);
  }

  @Get('/signin')
  signIn(
    @Body() userCredentialsDto: UserCredentialsDto
  ) {    
    return this.authServise.signIn(userCredentialsDto)
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  logOut(@GetUser() user) {
    return this.authServise.logOut(user.userName);
  }
}
