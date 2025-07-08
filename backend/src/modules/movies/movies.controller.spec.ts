import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

const mockMoviesService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  search: jest.fn(),
  addActorsToMovie: jest.fn(),
  getActorsInMovie: jest.fn(),
};

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    })
    .compile();

    controller = module.get<MoviesController>(MoviesController);
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should call moviesService.create with the correct DTO', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'New Movie',
        releaseYear: 2024,
        synopsis: 'A new story',
      };
      const expectedResult = { id: 'test-id', ...createMovieDto };
      mockMoviesService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createMovieDto);
      expect(result).toEqual(expectedResult);
      expect(mockMoviesService.create).toHaveBeenCalledWith(createMovieDto);
    });
  });

  describe('findAll', () => {
    it('Should return an array of movies', async () => {
      const expectedMovies = [{ id: 'test-id-1', title: 'Movie 1' }];
      mockMoviesService.findAll.mockResolvedValue(expectedMovies);

      const result = await controller.findAll();
      expect(result).toEqual(expectedMovies);
      expect(mockMoviesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Should return a single movie', async () => {
      const expectedMovie = { id: 'test-id', title: 'Single Movie' };
      mockMoviesService.findOne.mockResolvedValue(expectedMovie);

      const result = await controller.findOne('test-id');
      expect(result).toEqual(expectedMovie);
      expect(mockMoviesService.findOne).toHaveBeenCalledWith('test-id');
    });

    it('Should throw NotFoundException if movie is not found', async () => {
      mockMoviesService.findOne.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('Should update and return the movie', async () => {
      const updateMovieDto: UpdateMovieDto = { title: 'Updated Title' };
      const expectedMovie = { id: 'test-id', title: 'Updated Title' };
      mockMoviesService.update.mockResolvedValue(expectedMovie);

      const result = await controller.update('test-id', updateMovieDto);
      expect(result).toEqual(expectedMovie);
      expect(mockMoviesService.update).toHaveBeenCalledWith('test-id', updateMovieDto);
    });

    it('Should throw NotFoundException if movie to update not found', async () => {
      mockMoviesService.update.mockRejectedValue(new NotFoundException());
      await expect(controller.update('non-existent-id', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('Should remove a movie successfully', async () => {
      mockMoviesService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('test-id');
      expect(result).toBeUndefined();
      expect(mockMoviesService.remove).toHaveBeenCalledWith('test-id');
    });

    it('Should throw NotFoundException if movie to remove not found', async () => {
      mockMoviesService.remove.mockRejectedValue(new NotFoundException());
      await expect(controller.remove('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

});