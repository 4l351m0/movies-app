'use client';
import { FC, useEffect, useState } from 'react';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import MovieCard from '../../components/movies/MovieCard';
import API from '../../libs/api';
import type { Movie } from '../../types/movie.types';

const MoviesPage: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let res;
        if (searchQuery.trim()) {
          res = await API.get('/movies/search', { params: { query: searchQuery, page } });
        } else {
          res = await API.get('/movies', { params: { page } });
        }
        setMovies(res.data.data);
        setMeta(res.data.meta);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page, searchQuery]);

  const handleSearch = (query: string) => {
    setPage(1);
    setSearchQuery(query);
  };

  const handleDeleteMovie = (id: string) => {
    setMovies(movies => movies.filter(m => m.id !== id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Movies</h1>

      <SearchBar onSearch={handleSearch} placeholder="Search movies..." className="mb-6 max-w-xl mx-auto" />

      <div className='flex flex-wrap gap-5 justify-center items-center'>
        {movies.length === 0 ? (
          <div>No movies found.</div>
        ) : (
          movies.map(movie => <MovieCard key={movie.id} movie={movie} onDelete={handleDeleteMovie} />)
        )}
      </div>
      {meta && (
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default MoviesPage; 