'use client';

import React, { useState } from 'react';
import CardMovie from './CardMovie';

const SearchMovie = () => {
	const [title, settitle] = useState('');
    const [movies, setMovies] = useState([]);
	//const [timeoutId, setTimeoutId] = useState(null);

	const searchInputHandler = (e) => {
		settitle(e.target.value);
/* 
		// Cancela el temporizador existente (si hay uno)
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Inicia un nuevo temporizador
        const newTimeoutId = setTimeout(() => {
            handleSearchMovies();
        }, 1000); // Puedes ajustar el tiempo de espera según tus necesidades

        // Almacena el ID del nuevo temporizador
        setTimeoutId(newTimeoutId);
		 */
	};

    const handleSearchMovies = async () => {
        if (title.trim() === '') {
            return;
        }

        const OMDb_API_KEY = 'd4e75879';
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDb_API_KEY}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

	const handleKeyDown = (event) => {
		if(event.key === 'Enter') {
			event.preventDefault();
			handleSearchMovies();
		}
	}

	return (
		<>
			<form className='w-full px-4 py-3 flex flex-col md:flex-row justify-between items-center md:items-end gap-4'>
				<div className='flex flex-col gap-2 flex-1 w-full'>
					<label htmlFor='title' className='font-bold hidden md:flex'>
						Search movie title
					</label>
					<input 
						type='search' 
						id='title' 
						className='border border-gray-400 px-4 py-2 outline-none text-black rounded-lg' 
						placeholder='Movie name' 
						onChange={searchInputHandler}
						onKeyDown={handleKeyDown}
						value={title} 
					/>
				</div>
				<button 
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-lg w-full md:w-48' 
					type='button' 
					onClick={handleSearchMovies}
					//onTouchEnd={handleSearchMovies}
					//onMouseUp={handleSearchMovies}
				>
					Search
				</button>
			</form>
            {
				movies ? (
					<div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2 justify-center'>
						{
							movies.map(movie => (								
								<CardMovie movie={movie} key={movie.imdbID}/>
							))
						}
					</div>
				) : <h2 className='text-lg font-semibold text-center mt-10 py-2 shadow-md shadow-orange-200'>No movie matches found for <span className='text-red-700'>{title}</span></h2>
			}
		</>
	);
};

export default SearchMovie;
