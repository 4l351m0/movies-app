import { CreateMovieDto } from '@/types';
import API from '../../libs/api';

export const deleteMovie = async (movieId: string) => {
  return API.delete(`/movies/${movieId}`);
};

export const createMovie = async (movie: CreateMovieDto) => {
  console.log('Esta es al movie que vamos a crear', movie);
  return API.post('/movies', movie);
};