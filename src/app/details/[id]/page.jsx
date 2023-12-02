'use client';

import { useMovies } from '@/context/movieContext';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MoviePage = ({ params }) => {
	const [movie, setMovie] = useState([]);
	const { movies, setMovies } = useMovies();
	const { push } = useRouter();

	const searchParams = useSearchParams();
  	const name = searchParams.get('name');

	const OMDb_API_KEY = 'd4e75879';
	const idMovie = params.id;
	useEffect(() => {
		fetch(`http://www.omdbapi.com/?apikey=${OMDb_API_KEY}&i=${idMovie}`)
			.then((resp) => resp.json())
			.then((data) => setMovie(data));
	}, [idMovie]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!name){
			const filtered = movies.find(item => item === movie);
			if(filtered){
				console.log('Película ya exite');
			} else {
				setMovies((prevMovie) => [...prevMovie, movie]);
				console.log('Película agregada con éxito.');
			}
		} else {
			const deleteMovie = movies.filter((movie) => movie.imdbID !== idMovie);
			setMovies(deleteMovie);
			push('/favorites');
		}
	};

	const navegationReturn = () => {
		if(name) {
			push('/favorites')
		} else  {
			push('/')
		}
	}

	return (
		<div className='bg-gray-700 w-full sm:w-4/5 lg:w-2/3 xl:w-1/2 p-2 sm:p-4 md:p-6'>
			<form className='flex flex-col items-center justify-center gap-2 p-4 md:p-6 lg:p-8 bg-gray-800 rounded-xl' onSubmit={handleSubmit}>
				<Image src={movie.Poster} alt={movie.Title} width={230} height={230} className='shadow-gray-500 shadow-lg' />
				<div className='flex flex-col gap-2 my-6'>
					<h1 className='text-2xl font-bold text-center text-sky-700 mb-3'>{movie.Title}</h1>
					<div className='flex justify-between gap-4'>
						<p>
							<span className='font-semibold'>Released:</span> {movie.Released}
						</p>
						<p>
							<span className='font-semibold'>Language:</span> {movie.Language}
						</p>
					</div>
					<p>
						<span className='font-semibold'>Gender:</span> {movie.Genre}
					</p>
					<div className='flex justify-between gap-5'>
						<p>
							<span className='font-semibold'>Director:</span> {movie.Director}
						</p>
						<p>
							<span className='font-semibold'>Writer:</span> {movie.Writer}
						</p>
					</div>
					<p>
						<span className='font-semibold'>Actors:</span> {movie.Actors}
					</p>
					<p className='my-6'>
						<span className='font-semibold'>Plot:</span> {movie.Plot}
					</p>
					<p>
						<span className='font-semibold'>Awards:</span> {movie.Awards}
					</p>
				</div>
				<div className='w-full flex justify-center gap-3'>
					<button
						className={`btn-primary ${name ? 'bg-sky-800 hover:bg-sky-900':'bg-red-800 hover:bg-red-900'}`}
						type='button'
						onClick={navegationReturn}>
						Go back
					</button>
					<button className={clsx(
						'btn-primary',
						{
							'bg-red-700 hover:bg-red-900': name,
							'bg-sky-700 hover:bg-sky-900': !name
						})} type='submit'>
						{
							!name?'Add Favorites':'Remove'
						}
					</button>
				</div>
			</form>
		</div>
	);
};

export default MoviePage;
