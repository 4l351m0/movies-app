import { FC, useState } from 'react';

interface SearchBarProps {
	placeholder?: string;
	onSearch: (query: string) => void;
	className?: string;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch, className }) => {
	const [query, setQuery] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query.trim());
	};

	const handleClear = () => {
		setQuery('');
		onSearch('');
	};

	return (
		<form onSubmit={handleSubmit} className={`flex items-center max-w-[1200px] gap-2 ${className ?? ''}`}>
			<input
				type="text"
				value={query}
				onChange={handleInputChange}
				placeholder={placeholder}
				className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
			>
				Search
			</button>
			<button
				type="button"
				onClick={handleClear}
				className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400 transition-colors">
					Clear
			</button>
		</form>
	);
};

export default SearchBar; 