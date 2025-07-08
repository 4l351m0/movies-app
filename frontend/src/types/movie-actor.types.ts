import type { Actor } from './actor.types';
import type { Movie } from './movie.types';

export interface MovieActor {
  id: string;
  movieId: string;
  actorId: string;
  movie?: Movie;
  actor?: Actor;
}

export interface AddActorsDto {
  actorsId: string[];
} 