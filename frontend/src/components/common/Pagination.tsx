import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) return null;

	const handlePrev = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	};

	const getVisiblePages = () => {
		const pages = [];
		const maxVisible = 5;
		
		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			let start = Math.max(1, currentPage - 2);
			let end = Math.min(totalPages, currentPage + 2);
			
			if (currentPage <= 3) {
				end = Math.min(totalPages, 5);
			} else if (currentPage >= totalPages - 2) {
				start = Math.max(1, totalPages - 4);
			}
			
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
		}
		
		return pages;
	};

	const visiblePages = getVisiblePages();

	return (
		<div className="flex items-center justify-center gap-[5px] py-[5px]">
			<button
				onClick={handlePrev}
				disabled={currentPage === 1}
				className={`
					flex items-center rounded-[7px] gap-[5px] px-[10px] border text-sm font-medium transition-all duration-200
					${currentPage === 1 
						? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' 
						: 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 bg-white'
					}
				`}>
				<ChevronLeft className="w-[4px] h-[4px]" />
				Previous
			</button>

			{/* Page Numbers */}
			<div className="flex items-center gap-[3px] mx-[5px]">
				{visiblePages.map((page) => (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						className={`
						w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
						${page === currentPage
							? 'bg-blue-600 text-white shadow-sm'
							: 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-200'
						}
						`}>
						{page}
					</button>
				))}
			</div>

			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className={`
					flex items-center rounded-[7px] gap-[5px] px-[10px] border text-sm font-medium transition-all duration-200
					${currentPage === totalPages 
						? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' 
						: 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 bg-white'
					}
				`}>
				Next
				<ChevronRight className="w-4 h-4" />
			</button>

			<div className="ml-4 text-sm text-gray-500 whitespace-nowrap">
			{currentPage} of {totalPages}
			</div>
		</div>
	);
};

export default Pagination; 