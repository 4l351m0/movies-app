'use client';
import API from '@/libs/api';
import type { Actor } from '@/types/actor.types';
import type { Movie } from '@/types/movie.types';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const MovieDetailPage: FC = () => {
	const params = useParams();
	const { id } = params;
	const [movie, setMovie] = useState<Movie | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [allActors, setAllActors] = useState<Actor[]>([]);
	const [selectedActors, setSelectedActors] = useState<Actor[]>([]);
	const [availableActors, setAvailableActors] = useState<Actor[]>([]);
	const [actorToAdd, setActorToAdd] = useState<string>('');
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const res = await API.get(`/movies/${id}`);
				setMovie(res.data.data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		if (id) fetchMovie();
	}, [id]);

	useEffect(() => {
		if (!editMode) return;
		const fetchActors = async () => {
			try {
				const res = await API.get('/actors');
				setAllActors(res.data.data);
			} catch (err) {
				
			}
		};
		fetchActors();
	}, [editMode]);

	useEffect(() => {
		if (!movie || !allActors.length) return;
		const currentActors = (movie.movieActors || []).map(ma => ma.actor).filter(Boolean) as Actor[];
		setSelectedActors(currentActors);
		setAvailableActors(allActors.filter(a => !currentActors.some(ca => ca.id === a.id)));
	}, [movie, allActors]);

	const handleRemoveActor = (actorId: string) => {
		setSelectedActors(selectedActors.filter(a => a.id !== actorId));
		const actor = allActors.find(a => a.id === actorId);
		if (actor) setAvailableActors([...availableActors, actor]);
	};

	const handleAddActor = () => {
		if (!actorToAdd) return;
		const actor = allActors.find(a => a.id === actorToAdd);
		if (actor) {
			setSelectedActors([...selectedActors, actor]);
			setAvailableActors(availableActors.filter(a => a.id !== actor.id));
			setActorToAdd('');
		}
	};

	const handleSave = async () => {
		if (!movie) return;
		setSaving(true);
		try {
			await API.post(`/movies/${movie.id}/actors`, { actorsId: selectedActors.map(a => a.id) });
			const res = await API.get(`/movies/${movie.id}`);
			setMovie(res.data.data);
			setEditMode(false);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!movie) return <div>Movie not found.</div>;

	return (
		<div>
			{movie.poster && <img src={movie.poster} alt={movie.title} style={{ maxWidth: 300, marginBottom: 8 }} />}
			<h1>{movie.title} ({movie.releaseYear})</h1>
			{movie.duration && <div>Duration: {movie.duration} min</div>}
			{movie.genres && movie.genres.length > 0 && <div>Genres: {movie.genres.join(', ')}</div>}
			{movie.genre && <div>Genre: {movie.genre}</div>}
			<p>{movie.synopsis}</p>

			<button onClick={() => setEditMode(e => !e)}>{editMode ? 'Cancel' : 'Edit actors'}</button>

			{editMode ? (
				<div>
					<h2>Edit Actors</h2>
					<ul>
						{selectedActors.map(actor => (
							<li key={actor.id}>
								{actor.firstName} {actor.lastName}
								<button onClick={() => handleRemoveActor(actor.id)} style={{ marginLeft: 8 }}>X</button>
							</li>
						))}
					</ul>
					<div>
						<select value={actorToAdd} onChange={e => setActorToAdd(e.target.value)}>
							<option value="">Select actor to add</option>
							{availableActors.map(actor => (
								<option key={actor.id} value={actor.id}>
									{actor.firstName} {actor.lastName}
								</option>
							))}
						</select>
						<button onClick={handleAddActor} disabled={!actorToAdd}>Add</button>
					</div>
					<button onClick={handleSave} disabled={saving}>Save</button>
				</div>
			) : (
				movie.movieActors && movie.movieActors.length > 0 && (
					<div>
						<h2>Actors</h2>
						<ul>
							{movie.movieActors.map((ma) => (
								ma.actor ? (
									<li key={ma.actor.id}>
										{ma.actor.firstName} {ma.actor.lastName}
									</li>
								) : null
							))}
						</ul>
					</div>
				)
			)}
		</div>
	);
};

export default MovieDetailPage; 