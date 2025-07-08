import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { PaginationQueryDto } from '../../common/pagination.dto';
import { PaginatedResponseDto, PaginationMetaDto } from '../../common/response.dto';
import { MovieActor } from '../movies/entities/movie-actor.entity';
import { Movie } from '../movies/entities/movie.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorsService {
  private readonly logger = new Logger(ActorsService.name);

  constructor(
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
    @InjectRepository(MovieActor)
    private movieActorsRepository: Repository<MovieActor>,
  ){ }

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    this.logger.log(`Creating actor: ${createActorDto.firstName} ${createActorDto.lastName}`);
    const newActor = await this.actorsRepository.create(createActorDto);
    const savedActor = await this.actorsRepository.save(newActor);
    this.logger.log(`Actor created successfully with ID: ${savedActor.id}`);
    return savedActor;
  }

  async findAll(): Promise<Actor[]> {
    this.logger.log('Fetching all actors');
    const actors = await this.actorsRepository.find({
      relations: ['movieActors', 'movieActors.movie'],
    });
    this.logger.log(`Found ${actors.length} actors`);
    return actors;
  }

  async findOne(id: string): Promise<Actor> {
    this.logger.log(`Fetching actor with ID: ${id}`);
    const actor = await this.actorsRepository.findOne({
      where: { id },
      relations: ['movieActors', 'movieActors.movie']
    });

    if(!actor) {
      this.logger.warn(`Actor with ID: ${id} was not found`);
      throw new NotFoundException({
        message: `Actor with ID: ${id} was not found`,
        errorCode: 'ACTOR_NOT_FOUND',
        data: { id }
      });
    }

    this.logger.log(`Actor found: ${actor.firstName} ${actor.lastName}`);
    return actor;
  }

  async update(id: string, updateActorDto: UpdateActorDto): Promise<Actor> {
    this.logger.log(`Updating actor with ID: ${id}`);
    const actor = await this.actorsRepository.preload({
      id,
      ...updateActorDto
    });

    if(!actor) {
      this.logger.warn(`Actor with ID: ${id} was not found for update`);
      throw new NotFoundException({
        message: `Actor with ID: ${id} was not found for update`,
        errorCode: 'ACTOR_NOT_FOUND',
        data: { id }
      });
    }

    const updatedActor = await this.actorsRepository.save(actor);
    this.logger.log(`Actor updated successfully: ${updatedActor.firstName} ${updatedActor.lastName}`);
    return updatedActor;
  }

  async remove(id: string): Promise<Actor> {
    this.logger.log(`Deleting actor with ID: ${id}`);
    const actor = await this.actorsRepository.findOne({ where: { id } });
    const result = await this.actorsRepository.delete(id);

    if(result.affected === 0 || !actor) {
      this.logger.warn(`Actor with ID: ${id} was not found for deletion`);
      throw new NotFoundException({
        message: `Actor with ID: ${id} was not found for deletion`,
        errorCode: 'ACTOR_NOT_FOUND',
        data: { id }
      });
    }

    this.logger.log(`Actor deleted successfully: ${actor.firstName} ${actor.lastName}`);
    return actor;
  }

  async search(query: string): Promise<Actor[]> {
    this.logger.log(`Searching actors with query: ${query}`);
    const actors = await this.actorsRepository.find({
      where: [
        { firstName: Like(`%${query}%`) },
        { lastName: Like(`%${query}%`) },
      ],
      relations: ['movieActors', 'movieActors.movie'],
    });
    this.logger.log(`Found ${actors.length} actors matching query: ${query}`);
    return actors;
  }

  async getMoviesByActor(actorId: string): Promise<Movie[]> {
    this.logger.log(`Fetching movies for actor: ${actorId}`);
    const actor = await this.actorsRepository.findOne({
      where: { id: actorId },
      relations: ['movieActors', 'movieActors.movie'],
    });

    if (!actor) {
      this.logger.warn(`Actor with ID: ${actorId} was not found`);
      throw new NotFoundException({
        message: `Actor with ID: ${actorId} was not found`,
        errorCode: 'ACTOR_NOT_FOUND',
        data: { id: actorId }
      });
    }

    const movies = actor.movieActors.map(movieActor => movieActor.movie);
    this.logger.log(`Found ${movies.length} movies for actor: ${actor.firstName} ${actor.lastName}`);
    return movies;
  }

  async findAllPaginated(query: PaginationQueryDto): Promise<PaginatedResponseDto<Actor[]>> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [items, total] = await this.actorsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['movieActors', 'movieActors.movie']
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
      path: '/actors',
      message: 'Actors paginated list',
      data: items,
      meta,
    };
  }

  async searchPaginated(query: string, pagination: PaginationQueryDto): Promise<PaginatedResponseDto<Actor[]>> {
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const [items, total] = await this.actorsRepository.findAndCount({
      where: [
        { firstName: ILike(`%${query}%`) },
        { lastName: ILike(`%${query}%`) },
      ],
      skip: (page - 1) * limit,
      take: limit,
      relations: ['movieActors', 'movieActors.movie'],
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
      path: '/actors/search',
      message: 'Actors paginated search',
      data: items,
      meta,
    };
  }
}
