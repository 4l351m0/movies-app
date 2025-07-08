import { ApiKeyGuard } from '@common/guards/api-key.guard';
import { LoginGuard } from '@common/guards/login.guard';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/pagination.dto';
import { PaginatedResponseDto } from '../../common/response.dto';
import { AddActorsToMovieSwagger, CreateMovieSwagger, DeleteMovieSwagger, GetActorsInMovieSwagger, GetAllMoviesSwagger, GetMovieByIdSwagger, MoviesApiKeyHeader, MoviesAuthHeader, MoviesSwagger, SearchMoviesSwagger, UpdateMovieSwagger } from '../../swagger/movies.swagger';
import { AddActorsDto } from './dto/add-actors.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@UseGuards(LoginGuard)
@MoviesSwagger()
@MoviesAuthHeader()
@Controller('movies')
export class MoviesController {
  private readonly logger = new Logger(MoviesController.name);
  
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.CREATED)
  @CreateMovieSwagger()
  @MoviesApiKeyHeader()
  create(@Body() createMovieDto: CreateMovieDto) {
    this.logger.log(`Creating new movie: ${createMovieDto.title}`);
    return this.moviesService.create(createMovieDto);
  }

  @Post(':movieId/actors')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.OK)
  @AddActorsToMovieSwagger()
  @MoviesApiKeyHeader()
  addActors(
    @Param('movieId') movieId: string,
    @Body() addActorsDto: AddActorsDto,
  ){
    this.logger.log(`Adding actors to movie ${movieId}: ${addActorsDto.actorsId.join(', ')}`);
    return this.moviesService.addActorsToMovie(movieId, addActorsDto.actorsId);
  }

  @Get()
  @GetAllMoviesSwagger()
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResponseDto<any>> {
    this.logger.log('Fetching all movies');
    return this.moviesService.findAllPaginated(query);
  }

  @Get('search')
  @SearchMoviesSwagger()
  async search(@Query('query') query: string, @Query() pagination: PaginationQueryDto): Promise<PaginatedResponseDto<any>> {
    this.logger.log(`Searching movies with query: ${query}`);
    return this.moviesService.searchPaginated(query, pagination);
  }

  @Get(':id')
  @GetMovieByIdSwagger()
  findOne(@Param('id') id: string) {
    this.logger.log(`Fetching movie with ID: ${id}`);
    return this.moviesService.findOne(id);
  }

  @Get(':movieId/actors')
  @GetActorsInMovieSwagger()
  getActorsInMovie(@Param('movieId') movieId: string) {
    this.logger.log(`Fetching actors for movie: ${movieId}`);
    return this.moviesService.getActorsInMovie(movieId);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  @UpdateMovieSwagger()
  @MoviesApiKeyHeader()
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    this.logger.log(`Updating movie with ID: ${id}`);
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteMovieSwagger()
  @MoviesApiKeyHeader()
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting movie with ID: ${id}`);
    return this.moviesService.remove(id);
  }
}
