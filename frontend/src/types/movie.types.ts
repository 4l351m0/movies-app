import type { MovieActor } from './movie-actor.types';
import type { Rating } from './rating.types';

export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  synopsis: string;
  genre?: string;
  duration?: number;
  poster?: string;
  ratings?: Rating[];
  movieActors?: MovieActor[];
}

export interface CreateMovieDto {
  title: string;
  releaseYear: number;
  synopsis: string;
  genre?: string;
  duration?: number;
  poster?: string;
}

export type UpdateMovieDto = Partial<CreateMovieDto>; 