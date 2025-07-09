'use client';
import { FC, FormEvent, useEffect, useState } from 'react';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import MovieCard from '../../components/movies/MovieCard';
import API from '../../libs/api';
import { createMovie } from '../../services/movies/MoviesService';
import type { Movie } from '../../types/movie.types';

const MoviesPage: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  const handleCreateMovie = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const releaseYear = Number(formData.get('releaseYear'));
    const synopsis = formData.get('synopsis') as string;
    const duration = formData.get('duration') ? Number(formData.get('duration')) : undefined;
    const genre = formData.get('genre') ? (formData.get('genre') as string) : undefined;
    const poster = formData.get('poster') as string;

    try {
      const { data } = await createMovie({ title, releaseYear, synopsis, duration, genre, poster });
      setMovies(movies => [data.data, ...movies]);
      setShowModal(false);
    } catch (err: any) {
      alert('Error creating movie: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error} - You should login to get access</div>;

  return (
    <div>
      <header className="flex justify-center items-center gap-x-[100px]">
        <h1>Movies</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={() => setShowModal(true)}
        >
          Add Movie
        </button>
      </header>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-[6px] shadow-lg p-8 w-full max-w-md relative p-[15px]">
            <button
              className="absolute top-[5px] right-[5px] rounded-full text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
              aria-label="Close">
              &times;
            </button>
            <h3 className="text-xl font-bold">Add New Movie</h3>
            <form className="flex flex-col gap-[10px]" onSubmit={handleCreateMovie}>
              <input name="title" className="border rounded-[5px] px-[5px] py-[px]" placeholder="Title" required />
              <input name="releaseYear" className="border rounded-[5px] px-[5px] py-[5px]" placeholder="Release Year" type="number" required />
              <textarea name="synopsis" className="border rounded-[5px] px-[5px] py-[5px]" placeholder="Synopsis" required />
              <input name="duration" className="border rounded-[5px] px-[5px] py-[5px]" placeholder="Duration (minutes)" type="number" />
              <input name="genre" className="border rounded-[5px] px-[5px] py-[5px]" placeholder="Genre" />
              <input name="poster" className="border rounded-[5px] px-[5px] py-[5px]" placeholder="Poster URL" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Create</button>
            </form>
          </div>
        </div>
      )}

      <SearchBar onSearch={handleSearch} placeholder="Search movies..." className="mb-6 max-w-xl mx-auto" />

      <div className='flex flex-wrap gap-[15px] justify-center items-center'>
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