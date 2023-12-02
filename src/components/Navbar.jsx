'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
	let links = [
		{
			name: 'About',
			link: '/about',
		},
		{
			name: 'Favorites',
			link: '/favorites',
		},
		{
			name: 'Contact',
			link: '/contact',
		},
	];

	const [open, setOpen] = useState(false);

	return (
		<div className='w-full fixed top-0 left-0 md:relative'>
			<nav className='flex items-center justify-between py-2 px-7 md:px-10 bg-gray-700'>
				<Link href='/'>
					<div className='font-bold text-2xl text-black text-left flex items-center justify-center gap-3 md:w-full'>
						<p>MOVIES APP</p>
						<Image src='/icon-home.png' alt='icon-home' width={40} height={40} />
					</div>
				</Link>

				<div className='absolute right-8 top-4 md:hidden cursor-pointer flex flex-col gap-1' onClick={() => setOpen(!open)}>
					<span className={clsx('h-1 bg-black w-7', {'rotate-45 translate-y-2 duration-200': open})}></span>
					<span className={clsx('h-1 bg-black w-7', { 'opacity-0 duration-200': open })}></span>
					<span className={clsx('h-1 bg-black w-7', {'-rotate-45 -translate-y-2 duration-200': open})}></span>
				</div>

				<ul className={`absolute md:static md:flex md:items-center gap-4 font-semibold text-lg pb-12 md:pb-0 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-14 opacity-100 bg-gray-600' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
					{links.map((link) => (
						<li key={link.name} className='md:ml-8 text-xl my-7 md:my-0'>
							<Link href={link.link} className='text-black hover:text-gray-300 duration-300' onClick={() => setOpen(!open)}>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
