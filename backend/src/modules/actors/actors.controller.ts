import { ApiKeyGuard } from '@common/guards/api-key.guard';
import { LoginGuard } from '@common/guards/login.guard';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/pagination.dto';
import { PaginatedResponseDto } from '../../common/response.dto';
import { ActorsApiKeyHeader, ActorsAuthHeader, ActorsSwagger, CreateActorSwagger, DeleteActorSwagger, GetActorByIdSwagger, GetAllActorsSwagger, GetMoviesByActorSwagger, SearchActorsSwagger, UpdateActorSwagger } from '../../swagger/actors.swagger';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@UseGuards(LoginGuard)
@ActorsSwagger()
@ActorsAuthHeader()
@Controller('actors')
export class ActorsController {
  private readonly logger = new Logger(ActorsController.name);
  
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.CREATED)
  @CreateActorSwagger()
  @ActorsApiKeyHeader()
  create(@Body() createActorDto: CreateActorDto) {
    this.logger.log(`Creating new actor: ${createActorDto.firstName} ${createActorDto.lastName}`);
    return this.actorsService.create(createActorDto);
  }

  @Get()
  @GetAllActorsSwagger()
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResponseDto<any>> {
    this.logger.log('Fetching all actors');
    return this.actorsService.findAllPaginated(query);
  }

  @Get('search')
  @SearchActorsSwagger()
  async search(@Query('query') query: string, @Query() pagination: PaginationQueryDto): Promise<PaginatedResponseDto<any>> {
    this.logger.log(`Searching actors with query: ${query}`);
    return this.actorsService.searchPaginated(query, pagination);
  }

  @Get(':id')
  @GetActorByIdSwagger()
  findOne(@Param('id') id: string) {
    this.logger.log(`Fetching actor with ID: ${id}`);
    return this.actorsService.findOne(id);
  }

  @Get(':actorId/movies')
  @GetMoviesByActorSwagger()
  getMoviesByActor(@Param('actorId') actorId: string) {
    this.logger.log(`Fetching movies for actor: ${actorId}`);
    return this.actorsService.getMoviesByActor(actorId);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.OK)
  @UpdateActorSwagger()
  @ActorsApiKeyHeader()
  update(
    @Param('id') id: string, 
    @Body() updateActorDto: UpdateActorDto
  ){
    this.logger.log(`Updating actor with ID: ${id}`);
    return this.actorsService.update(id, updateActorDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteActorSwagger()
  @ActorsApiKeyHeader()
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting actor with ID: ${id}`);
    return this.actorsService.remove(id);
  }
}
