'use client';
import { FC, useEffect, useState } from 'react';
import ActorCard from '../../components/actors/ActorCard';
import SearchBar from '../../components/common/SearchBar';
import API from '../../libs/api';
import type { Actor } from '../../types/actor.types';

const ActorsPage: FC = () => {
	const [actors, setActors] = useState<Actor[]>([]);
	const [meta, setMeta] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const fetchActors = async () => {
			try {
				let res;
				if (searchQuery.trim()) {
					res = await API.get('/actors/search', { params: { query: searchQuery } });
				} else {
					res = await API.get('/actors');
				}
				setActors(res.data.data);
				setMeta(res.data.meta);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchActors();
	}, [searchQuery]);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const handleDeleteActor = (id: string) => {
		setActors(actors => actors.filter(a => a.id !== id));
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='flex flex-col flex-wrap gap-10 justify-center items-center'>
			<h1>Actors</h1>
			<SearchBar onSearch={handleSearch} placeholder="Search actors..." className="mb-6 max-w-xl mx-auto" />
			<div className='flex flex-wrap gap-5 justify-center items-center'>
				{actors.length === 0 ? (
					<div>No actors found.</div>
				) : (
					actors.map(actor => <ActorCard key={actor.id} actor={actor} onDelete={handleDeleteActor} />)
				)}
			</div>
		</div>
	);
};

export default ActorsPage; 