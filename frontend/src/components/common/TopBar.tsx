'use client';

import Link from 'next/link';
import { FC } from 'react';

const TopBar: FC = () => {
	return (
		<div className="w-full bg-[#ffffff] py-[10px] rounded-full">
			<nav className='text-center w-full'>
				<Link href="/auth/login">Login</Link> | {' '}
				<Link href="/">Home</Link> | {' '}
				<Link href="/movies">Movies</Link> | {' '}
				<Link href="/actors">Actors</Link> | {' '}
			</nav>
		</div>
	);
};

export default TopBar; 