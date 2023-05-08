import {
  Controller,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './DTO/userCredentials.dto';
import { User } from './Schemas/User.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authServise: AuthService
  ) { }

  @Post('/signup')
  signUp(
    @Body() userCredentialsDto: UserCredentialsDto
  ): Promise<User> {
    return this.authServise.signUp(userCredentialsDto);
  }

  @Get('/signin')
  signIn(
    @Body() userCredentialsDto: UserCredentialsDto
  ) {
    return this.authServise.signIn(userCredentialsDto)
  }
}
