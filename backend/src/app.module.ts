import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { ActorsModule } from './modules/actors/actors.module';
import { AuthModule } from './modules/auth/auth.module';
import { MoviesModule } from './modules/movies/movies.module';
import { RatingsModule } from './modules/ratings/ratings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    MoviesModule,
    ActorsModule,
    RatingsModule,
    AuthModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
