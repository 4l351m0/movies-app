import { LoginGuard } from '@common/guards/login.guard';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/pagination.dto';
import { PaginatedResponseDto } from '../../common/response.dto';
import { CreateRatingSwagger, DeleteRatingSwagger, GetAllRatingsSwagger, GetRatingsByMovieIdSwagger, RatingsAuthHeader, RatingsSwagger } from '../../swagger/ratings.swagger';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';

@UseGuards(LoginGuard)
@RatingsSwagger()
@RatingsAuthHeader()
@Controller('ratings')
export class RatingsController {
  private readonly logger = new Logger(RatingsController.name);
  
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CreateRatingSwagger()
  create(@Body() createRatingDto: CreateRatingDto) {
    this.logger.log(`Creating new rating with value: ${createRatingDto.value}`);
    return this.ratingsService.create(createRatingDto);
  }

  @Get()
  @GetAllRatingsSwagger()
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResponseDto<any>> {
    this.logger.log('Fetching all ratings');
    return this.ratingsService.findAllPaginated(query);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteRatingSwagger()
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting rating with ID: ${id}`);
    return this.ratingsService.remove(id);
  }

  @Get('movie/:movieId')
  @GetRatingsByMovieIdSwagger()
  findRatingsByMovieId(@Param('movieId') movieId: string) {
    this.logger.log(`Fetching ratings for movie: ${movieId}`);
    return this.ratingsService.findRatingsByMovieId(movieId);
  }
}