import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowDto } from './DTOs/show.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Decorators/getUser.decorator';

@Controller('shows')
export class ShowsController {
  constructor(
    private showsService: ShowsService
  ) { }

  @Get()
  getShows() {
    return this.showsService.getShows();
  }

  @Post()
  @UseGuards(AuthGuard())
  createShow(
    @Body() showDto: ShowDto,
    @GetUser() user
  ) {
    return this.showsService.createShow(showDto, user)
  }
}
