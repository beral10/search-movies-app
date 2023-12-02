'use client';
import { MovieContext, useMovies } from '@/context/movieContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const FavoriteMovies = () => {
	/* const {movies} = useContext(MovieContext);
  console.log(movies); */
	const { push } = useRouter();
	const { movies, setMovies } = useMovies();
	console.log(movies);

	const deleteMovie = (id) => {
		const newMovies = movies.filter((movie) => movie.imdbID !== id);
		setMovies(newMovies);
		console.log('Película eliminada de Favoritos.');
	};

	return (
		<div>
			{movies.length === 0 ? (
				<h1>No movies added yet</h1>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{movies.map((movie) => (
						<div key={movie.imdbID} className='p-4 flex flex-col items-center justify-between bg-gray-800 gap-2 rounded-md'>
							<Image src={movie.Poster.toString()} alt={movie.Title} width={150} height={150} className='shadow-lg shadow-gray-500' />
							<h1 className='text-xl font-bold text-center'>{movie.Title}</h1>
							<p>{movie.Year}</p>
							<p>
								Type: <span>{movie.Type}</span>
							</p>
							<div className='w-full flex justify-between gap-2 mt-4'>
								<button className='bg-red-600 hover:bg-red-800 font-semibold w-1/2 rounded-lg py-1 px-4' onClick={() => deleteMovie(movie.imdbID)}>
									Remove
								</button>
								<button className='bg-sky-600 hover:bg-sky-800 font-semibold w-1/2 rounded-lg py-1 px-4' onClick={() => push(`/favorites/view/${movie.imdbID}?name=${movie.Title}`)}>
									Details
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FavoriteMovies;
