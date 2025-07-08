import type { Movie } from './movie.types';

export interface Rating {
  id: string;
  value: number;
  movie?: Movie;
}

export interface CreateRatingDto {
  value: number;
  movieId: string;
}

export type UpdateRatingDto = Partial<Omit<CreateRatingDto, 'movieId'>>; 