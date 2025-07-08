'use client';

import Link from 'next/link';
import { FC } from 'react';

const TopBar: FC = () => {
	return (
		<div>
			<nav className='text-center w-full'>
				<Link href="/movies">Movies</Link> | {' '}
				<Link href="/actors">Actors</Link> | {' '}
				<Link href="/auth/login">Login</Link>
			</nav>
		</div>
	);
};

export default TopBar; 