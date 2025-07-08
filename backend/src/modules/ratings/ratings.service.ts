import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../../common/pagination.dto';
import { PaginatedResponseDto, PaginationMetaDto } from '../../common/response.dto';
import { Movie } from '../movies/entities/movie.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  private readonly logger = new Logger(RatingsService.name);

  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ){}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    this.logger.log(`Creating rating with value ${createRatingDto.value} for movie: ${createRatingDto.movieId}`);
    
    const movie = await this.moviesRepository.findOne({ where: { id: createRatingDto.movieId }});

    if(!movie) {
      this.logger.warn(`Movie with ID: ${createRatingDto.movieId} was not found`);
      throw new NotFoundException({
        message: `Movie with ID: ${createRatingDto.movieId} was not found`,
        errorCode: 'MOVIE_NOT_FOUND',
        data: { id: createRatingDto.movieId }
      });
    }

    const addRating = this.ratingsRepository.create({
      ...createRatingDto,
      movie
    });

    const savedRating = await this.ratingsRepository.save(addRating);
    this.logger.log(`Rating created successfully with ID: ${savedRating.id}`);
    return savedRating;
  }

  async findAll(): Promise<Rating[]> {
    this.logger.log('Fetching all ratings');
    const ratings = await this.ratingsRepository.find({
      relations: ['movie'],
    });
    this.logger.log(`Found ${ratings.length} ratings`);
    return ratings;
  }

  async remove(id: string): Promise<Rating> {
    this.logger.log(`Deleting rating with ID: ${id}`);
    const rating = await this.ratingsRepository.findOne({ where: { id } });
    const result = await this.ratingsRepository.delete(id);

    if(result.affected === 0 || !rating) {
      this.logger.warn(`Rating with ID: ${id} was not found for deletion`);
      throw new NotFoundException({
        message: `Rating with ID: ${id} was not found for deletion`,
        errorCode: 'RATING_NOT_FOUND',
        data: { id }
      });
    }

    this.logger.log(`Rating deleted successfully with ID: ${id}`);
    return rating;
  }

  async findRatingsByMovieId(movieId: string): Promise<Rating[]> {
    this.logger.log(`Fetching ratings for movie: ${movieId}`);
    const ratings = await this.ratingsRepository.find({
      where: { movie: { id: movieId } },
      relations: ['movie'],
    });
    this.logger.log(`Found ${ratings.length} ratings for movie: ${movieId}`);
    return ratings;
  }

  async findAllPaginated(query: PaginationQueryDto): Promise<PaginatedResponseDto<Rating[]>> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [items, total] = await this.ratingsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['movie']
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
      path: '/ratings',
      message: 'Ratings paginated list',
      data: items,
      meta,
    };
  }
}
