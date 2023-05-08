import { Controller, Get } from '@nestjs/common';
import { ShowsService } from './shows.service';

@Controller('shows')
export class ShowsController {
  constructor(
    private showsService: ShowsService
  ) {}

  @Get()
  getShows() {
    return this.showsService.getShows();
  }
}
