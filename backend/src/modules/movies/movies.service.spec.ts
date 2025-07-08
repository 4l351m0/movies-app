import { Actor } from '@modules/actors/entities/actor.entity';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieActor } from './entities/movie-actor.entity';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

const mockMovieRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn()
}

const mockActorRepository = {
  findByIds: jest.fn()
}

const mockMovieActorRepository = {
  create: jest.fn(),
  save: jest.fn()
}

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
        },
        {
          provide: getRepositoryToken(Actor),
          useValue: mockActorRepository,
        },
        {
          provide: getRepositoryToken(MovieActor),
          useValue: mockMovieActorRepository
        }
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a movie and return it', async () => {
      const createMovieDto = {
        title: 'Toy Story 4',
        releaseYear: 2015,
        synopsis: 'A animation movie for kids'
      };

      const expectedMovie = { id: 'uuid-1', ...createMovieDto }

      mockMovieRepository.create.mockReturnValue(expectedMovie);
      mockMovieRepository.save.mockReturnValue(expectedMovie);

      const result = await service.create(createMovieDto);
      expect(result).toEqual(expectedMovie);
      expect(mockMovieRepository.create).toHaveBeenCalledWith(createMovieDto);
      expect(mockMovieRepository.save).toHaveBeenCalledWith(expectedMovie);
    });
  });


  describe('findAll', () => {
    it('Should return all movies', async () => {
      const expectedMovies = [
        { id: 'uuid-1', title: 'Movie 1' },
        { id: 'uuid-2', title: 'Movie 2' }
      ];

      mockMovieRepository.find.mockResolvedValue(expectedMovies);

      const result = await service.findAll();
      expect(result).toEqual(expectedMovies);
      expect(mockMovieRepository.find).toHaveBeenCalledWith({
        relations: ['ratings', 'movieActors', 'movieActors.actor']
      });
    });

    describe('findOne', () => {
      it('Should return a movie by id', async () => {
        const expectedMovie = { id: 'uuid-1', title: 'Movie 1', synopsis: 'The movie is this' }

        mockMovieRepository.findOne.mockResolvedValue(expectedMovie);

        const result = await service.findOne('uuid-1');
        expect(result).toEqual(expectedMovie);
        expect(mockMovieRepository.findOne).toHaveBeenCalledWith({
          where: { id: 'uuid-1' },
          relations: ['ratings', 'movieActors', 'movieActors.actor']
        });
      });

      describe('update', () => {
        it('Should update and return the movie', async () => {
          const updateMovieDto = { title: 'Updated Movie' };
          const existingMovie = { id: 'uuid-1', title: 'Original Title' };
          const updatedMovie = { ...existingMovie, ...updateMovieDto };
    
          mockMovieRepository.preload.mockResolvedValue(updatedMovie);
          mockMovieRepository.save.mockResolvedValue(updatedMovie);
    
          const result = await service.update('uuid-1', updateMovieDto);
          expect(result).toEqual(updatedMovie);
          expect(mockMovieRepository.preload).toHaveBeenCalledWith({ id: 'uuid-1', ...updateMovieDto });
          expect(mockMovieRepository.save).toHaveBeenCalledWith(updatedMovie);
        });
    
        it('Should throw NotFoundException if movie was not found', async () => {
          mockMovieRepository.preload.mockResolvedValue(null);
          await expect(service.update('non-existent-id', {})).rejects.toThrow(NotFoundException);
        });
      });
    
      describe('remove', () => {
        it('Should remove a movie successfully', async () => {
          mockMovieRepository.delete.mockResolvedValue({ affected: 1 });
          await expect(service.remove('uuid-1')).resolves.toBeUndefined();
          expect(mockMovieRepository.delete).toHaveBeenCalledWith('uuid-1');
        });
    
        it('Should throw NotFoundException if movie was not found', async () => {
          mockMovieRepository.delete.mockResolvedValue({ affected: 0 });
          await expect(service.remove('non-existent-id')).rejects.toThrow(NotFoundException);
        });
      });
    
      describe('addActorsToMovie', () => {
        it('Should return the movie with actors added to it', async () => {
          const movieId = 'movie-id-1';
          const actorIds = ['actor-id-1', 'actor-id-2'];
          const role = 'Main Actor';
    
          const movie = { id: movieId, title: 'Test Movie' };
          const actor1 = { id: 'actor-id-1', firstName: 'A1' };
          const actor2 = { id: 'actor-id-2', firstName: 'A2' };
    
          mockMovieRepository.findOne.mockResolvedValue(movie);
          mockActorRepository.findByIds.mockResolvedValue([actor1, actor2]);
          mockMovieActorRepository.create.mockImplementation((data) => data);
          mockMovieActorRepository.save.mockResolvedValue(true);
          mockMovieRepository.findOne.mockResolvedValueOnce(movie).mockResolvedValueOnce({
            ...movie,
            movieActors: [
              { movie, actor: actor1 },
              { movie, actor: actor2 }
            ]
          });
    
    
          const result = await service.addActorsToMovie(movieId, actorIds);
    
          expect(mockMovieRepository.findOne).toHaveBeenCalledWith({ where: { id: movieId } });
          expect(mockActorRepository.findByIds).toHaveBeenCalledWith(actorIds);
          expect(mockMovieActorRepository.save).toHaveBeenCalledTimes(1);
          expect(result.movieActors.length).toBe(2);
        });
      });
      
    });
  });
});
