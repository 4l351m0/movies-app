import { Clock, Star, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { addMovieRating, getMovieRatingStats } from '../../services/ratings/ratings.service';
import type { Movie } from '../../types/movie.types';

interface MovieCardProps {
  movie: Movie;
  onDelete?: (id: string) => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onDelete }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await import('../../services/movies/MoviesService').then(m => m.deleteMovie(movie.id));
        if (onDelete) onDelete(movie.id);
      } catch (e) {
        alert('Error deleting movie');
      }
    }
  };

  const [ratingStats, setRatingStats] = useState<{ average: number, count: number } | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    getMovieRatingStats(movie.id).then(stats => {
      if (mounted) setRatingStats({
        average: stats?.data?.average ?? 0,
        count: stats?.data?.count ?? 0
      });
    }).catch(() => {
      if (mounted) setRatingStats({ average: 0, count: 0 });
    });
    return () => { mounted = false; };
  }, [movie.id]);

  const handleRate = async (value: number) => {
    await addMovieRating(movie.id, value);
    const stats = await getMovieRatingStats(movie.id);
    setRatingStats({
      average: stats?.data?.average ?? 0,
      count: stats?.data?.count ?? 0
    });
  };

  return (
    <div className="flex flex-col gap-5 border w-[300px] rounded-[7px] border-solid border-[grey] relative group">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-600 rounded-full p-1 z-10 hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
        style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        title="Delete movie"
      >
        <X className="w-4 h-4 text-white" />
      </button>
      <div className="relative group min-h-[460px]">
        <div className='min-h-[460px]'>
          <img 
            src={movie.poster}
            alt={movie.title}
            className="w-full object-cover" 
            style={{ cursor: 'pointer' }}
            onClick={handleClick}/>
        </div>
        <div className="top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-lg flex items-center gap-1 font-bold text-sm">
          {[1,2,3,4,5].map((value) => (
            <Star
              key={value}
              className="w-4 h-4"
              fill={hoveredStar && value <= hoveredStar ? '#FFD700' : 'currentColor'}
              color={hoveredStar && value <= hoveredStar ? '#FFD700' : 'currentColor'}
              onMouseEnter={() => setHoveredStar(value)}
              onMouseLeave={() => setHoveredStar(null)}
              style={{ cursor: 'pointer' }}
              onClick={() => handleRate(value)}
            />
          ))}
          {ratingStats && (
            <span className="mx-auto">{(ratingStats.average ?? 0).toFixed(1)}</span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            <p 
              style={{ cursor: 'pointer', display: 'inline' }}
              onClick={handleClick}
            >{movie.title}</p>
          </h3>
          <span className="text-gray-500 text-sm font-medium">
            {movie.releaseYear}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              <p> { movie.genre } </p>
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <Clock className="w-4 h-4" />
          <span> Durarion: {movie.duration}</span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {movie.synopsis}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;