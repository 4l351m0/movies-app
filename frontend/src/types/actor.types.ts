import type { MovieActor } from './movie-actor.types';

export interface Actor {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  movieActors?: MovieActor[];
}

export interface CreateActorDto {
  firstName: string;
  lastName: string;
  birthDate?: string;
}

export type UpdateActorDto = Partial<CreateActorDto>; 