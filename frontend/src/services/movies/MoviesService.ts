import API from '../../libs/api';
 
export const deleteMovie = async (movieId: string) => {
  return API.delete(`/movies/${movieId}`);
}; 