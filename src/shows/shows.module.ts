import { Module } from '@nestjs/common';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Show, ShowSchema } from './Schemas/Show.scema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Show.name, schema: ShowSchema }]),
    AuthModule,
  ],
  controllers: [ShowsController],
  providers: [ShowsService]
})
export class ShowsModule { }
