import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CardMovie = ({movie}) => {
	return (
		<div className='p-4 flex flex-col items-center justify-between max-w-xs bg-gray-800 gap-2'>
			<Image src={movie.Poster.toString()} alt={movie.Title} width={150} height={150} />
			<h1 className='text-xl font-bold text-center'>{movie.Title}</h1>
			<p>{movie.Year}</p>
			<p>
				Type: <span>{movie.Type}</span>
			</p>
			<Link href={`/details/${movie.imdbID}`} className='w-full'>
				<button 
				//onClick={() => localStorage.setItem('selectedMovie', JSON.stringify(movie))}
				className='bg-sky-600 hover:bg-sky-800 font-semibold w-full rounded-lg py-2 px-4 mt-4'>Details</button>
			</Link>
		</div>
	);
};

export default CardMovie;
