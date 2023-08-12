import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Show } from 'src/shows/Schemas/Show.scema';

@Injectable()
export class CanCreateAnEpisodeGuard implements CanActivate {
  constructor(
    @InjectModel(Show.name)
    private readonly showModel: Model<Show>,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const showId = request.params.showId;
    const user = request.user;
    const show = await this.showModel.findById(showId);

    if (!show) {
      throw new NotFoundException('Show not found');
    }
    const showCreatedByUser = user.id === show.createdBy.toString();

    if (!showCreatedByUser) {
      throw new ForbiddenException(
        'You do not have permission to edit this show.'
      );
    }
    return showCreatedByUser;
  }
}
