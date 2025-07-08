import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieActor } from '../movies/entities/movie-actor.entity';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { Actor } from './entities/actor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Actor, MovieActor])
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
  exports: [ActorsService],
})
export class ActorsModule {}
