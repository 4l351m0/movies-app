import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, In, Repository } from 'typeorm';
import { PaginationQueryDto } from '../../common/pagination.dto';
import { PaginatedResponseDto, PaginationMetaDto } from '../../common/response.dto';
import { Actor } from '../actors/entities/actor.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieActor } from './entities/movie-actor.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
    @InjectRepository(MovieActor)
    private movieActorsRepository: Repository<MovieActor>,
    private dataSource: DataSource
  ){}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    this.logger.log(`Creating movie: ${createMovieDto.title}`);
    const newMovie = this.moviesRepository.create(createMovieDto);
    const savedMovie = await this.moviesRepository.save(newMovie);
    this.logger.log(`Movie created successfully with ID: ${savedMovie.id}`);
    return savedMovie;
  }

  async findAll(): Promise<Movie[]> {
    this.logger.log('Fetching all movies');
    const movies = await this.moviesRepository.find({
      relations: ['ratings', 'movieActors', 'movieActors.actor']
    });
    this.logger.log(`Found ${movies.length} movies`);
    return movies;
  }

  async findOne(id: string): Promise<Movie> {
    this.logger.log(`Fetching movie with ID: ${id}`);
    const movie = await this.moviesRepository.findOne({
      where: { id },
      relations: ['ratings', 'movieActors', 'movieActors.actor']
    });

    if(!movie) {
      this.logger.warn(`Movie with ID: ${id} was not found`);
      throw new NotFoundException({
        message: `Movie with ID: ${id} was not found`,
        errorCode: 'MOVIE_NOT_FOUND',
        data: { id }
      });
    }

    this.logger.log(`Movie found: ${movie.title}`);
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    this.logger.log(`Updating movie with ID: ${id}`);
    const movie = await this.moviesRepository.preload({
      id,
      ...updateMovieDto
    });

    if(!movie) {
      this.logger.warn(`Movie with ID: ${id} was not found for update`);
      throw new NotFoundException({
        message: `Movie with ID: ${id} was not found for update`,
        errorCode: 'MOVIE_NOT_FOUND',
        data: { id }
      });
    }

    const updatedMovie = await this.moviesRepository.save(movie);
    this.logger.log(`Movie updated successfully: ${updatedMovie.title}`);
    return updatedMovie;
  }

  async remove(id: string): Promise<Movie> {
    this.logger.log(`Deleting movie with ID: ${id}`);
    const movie = await this.moviesRepository.findOne({ where: { id } });    
    const result = await this.moviesRepository.delete(id);

    if(result.affected === 0 || !movie) {
      this.logger.warn(`Movie with ID: ${id} was not found for deletion`);
      throw new NotFoundException({
        message: `Movie with ID: ${id} was not found for deletion`,
        errorCode: 'MOVIE_NOT_FOUND',
        data: { id }
      });
    }

    this.logger.log(`Movie deleted successfully: ${movie.title}`);
    return movie;
  }

  async search(query: string): Promise<Movie[]> {
    this.logger.log(`Searching movies with query: ${query}`);
    const movies = await this.moviesRepository.find({
      where: [
        { title: ILike(`%${query}%`) },
        { synopsis: ILike(`%${query}%`) }
      ],
      relations: ['ratings', 'movieActors', 'movieActors.actor']
    });
    this.logger.log(`Found ${movies.length} movies matching query: ${query}`);
    return movies;
  }

  async addActorsToMovie(movieId: string, actorsId: string[]): Promise<Movie> {
    this.logger.log(`Syncing actors for movie: ${movieId}`);
    const movie = await this.moviesRepository.findOne({ where: { id: movieId }, relations: ['movieActors'] });
    if(!movie) {
      this.logger.warn(`Movie with ID: ${movieId} was not found`);
      throw new NotFoundException({
        message: `Movie with ID: ${movieId} was not found`,
        errorCode: 'MOVIE_NOT_FOUND',
        data: { id: movieId }
      });
    }
    await this.dataSource.transaction(async manager => {

      const currentMovieActors = movie.movieActors || [];
      const currentActorIds = currentMovieActors.map(ma => ma.actorId);
      
      const toRemove = currentMovieActors.filter(ma => !actorsId.includes(ma.actorId));
      if (toRemove.length > 0) {
        await manager.getRepository(MovieActor).remove(toRemove);
      }
      
      const toAddIds = actorsId.filter(id => !currentActorIds.includes(id));
      if (toAddIds.length > 0) {
        const actorsToAdd = await manager.getRepository(Actor).findBy({ id: In(toAddIds) });
        const movieActorsToAdd = actorsToAdd.map(actor => {
          const ma = new MovieActor();
          ma.movie = movie;
          ma.actor = actor;
          return ma;
        });
        await manager.getRepository(MovieActor).save(movieActorsToAdd);
      }
    });
    return this.findOne(movieId);
  }

  async getActorsInMovie(movieId: string): Promise<Actor[]> {
    this.logger.log(`Fetching actors for movie: ${movieId}`);
    const movie = await this.moviesRepository.findOne(
      { 
        where: { id: movieId },
        relations: ['movieActors', 'movieActors.actor']
      });

    if(!movie) {
      this.logger.warn(`Movie with ID: ${movieId} was not found`);
      throw new NotFoundException({
        message: `Movie with ID: ${movieId} was not found`,
        errorCode: 'MOVIE_NOT_FOUND',
        data: { id: movieId }
      });
    }

    const actors = movie.movieActors.map( movieactor => movieactor.actor );
    this.logger.log(`Found ${actors.length} actors in movie: ${movie.title}`);
    return actors;
  }

  async findAllPaginated(query: PaginationQueryDto): Promise<PaginatedResponseDto<Movie[]>> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [items, total] = await this.moviesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['ratings', 'movieActors', 'movieActors.actor']
    });
    const meta: PaginationMetaDto = {
      totalItems: total,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
    return {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: '/movies',
      message: 'Movies paginated list',
      data: items,
      meta,
    };
  }

  async searchPaginated(query: string, pagination: PaginationQueryDto): Promise<PaginatedResponseDto<Movie[]>> {
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const [items, total] = await this.moviesRepository.findAndCount({
      where: [
        { title: ILike(`%${query}%`) },
        { synopsis: ILike(`%${query}%`) }
      ],
      skip: (page - 1) * limit,
      take: limit,
      relations: ['ratings', 'movieActors', 'movieActors.actor']
    });
    const meta: PaginationMetaDto = {
      totalItems: total,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
    return {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: '/movies/search',
      message: 'Movies paginated search',
      data: items,
      meta,
    };
  }
}
