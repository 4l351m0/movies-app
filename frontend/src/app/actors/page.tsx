'use client';
import { FC, FormEvent, useEffect, useState } from 'react';
import ActorCard from '../../components/actors/ActorCard';
import SearchBar from '../../components/common/SearchBar';
import API from '../../libs/api';
import type { Actor, CreateActorDto } from '../../types/actor.types';

const ActorsPage: FC = () => {
	const [actors, setActors] = useState<Actor[]>([]);
	const [meta, setMeta] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [showModal, setShowModal] = useState(false);

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

	const handleCreateActor = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		
		const actorData: CreateActorDto = {
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			birthDate: formData.get('birthDate') ? (formData.get('birthDate') as string) : undefined,
		};

		try {
			const { data } = await API.post('/actors', actorData);
			setActors(actors => [data.data, ...actors]);
			setShowModal(false);
			form.reset();
		} catch (err: any) {
			alert('Error creating actor: ' + (err.response?.data?.message || err.message));
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='flex flex-col flex-wrap justify-between items-center'>
			<header className="flex justify-center items-center gap-x-[100px]">
				<h1>Actors</h1>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
					onClick={() => setShowModal(true)}>
					Add Actor
				</button>
			</header>
			<SearchBar onSearch={handleSearch} placeholder="Search actors..." className="mb-6 max-w-xl mx-auto" />
			<div className='flex flex-wrap gap-[15px] justify-center items-center'>
				{actors.length === 0 ? (
					<div>No actors found.</div>
				) : (
					actors.map(actor => <ActorCard key={actor.id} actor={actor} onDelete={handleDeleteActor} />)
				)}
			</div>

			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-[#1a1a1a] rounded-[6px] shadow-lg p-8 w-full max-w-md relative p-[15px]">
						<button
						className="absolute top-[5px] right-[5px] rounded-full text-gray-500 hover:text-gray-800"
						onClick={() => setShowModal(false)}
						aria-label="Close">
						&times;
						</button>
						<h3 className="text-xl font-bold">Add New Actor</h3>
						<form className="flex flex-col gap-[10px]" onSubmit={handleCreateActor}>
						<input name="firstName" className="border rounded-[5px] px-[5px] py-[5px]" placeholder="First Name" required />
						<input name="lastName" className="border rounded-[5px] px-[5px] py-[5px]" placeholder="Last Name" required />
						<input name="birthDate" className="border rounded-[5px] px-[5px] py-[5px]" placeholder="Birth Date" type="date" />
						<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Create</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ActorsPage; 