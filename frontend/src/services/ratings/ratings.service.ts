import API from '../../libs/api';

export const getMovieRatingStats = async (movieId: string) => {
  const { data } = await API.get(`/ratings/movie/${movieId}/stats`);
  return data;
};

export const addMovieRating = async (movieId: string, value: number) => {
  const { data } = await API.post('/ratings', { movieId, value });
  return data;
};