import { Module } from '@nestjs/common';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Show, ShowSchema } from './Schemas/Show.scema';
import { AuthModule } from 'src/auth/auth.module';
import { Season, SeasonSchema } from './Schemas/Season.scema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Show.name, schema: ShowSchema }]),
    MongooseModule.forFeature([{ name: Season.name, schema: SeasonSchema }]),
    AuthModule,
  ],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule { }
