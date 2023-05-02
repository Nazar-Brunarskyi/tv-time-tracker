import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './DTO/userCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authServise: AuthService 
  ) { }

  @Post('/signup')
  signUp(
    @Body() userCredentialsDto: UserCredentialsDto
  ) {
    return this.authServise.signUp(userCredentialsDto);
  }
}
