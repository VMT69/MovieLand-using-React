import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=79d438d8'; // Changed to HTTPS

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search);
                setError(null);
            } else {
                setMovies([]);
                setError(data.Error || 'No movies found');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch data');
            setMovies([]);
        }
    };

    useEffect(() => {
        searchMovies(''); 
    }, []);

    return (
        <div className='app'>
            <h1>VMT's MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {error ? (
                <div className='empty'>
                    <h2>No movies found!</h2>
                </div>
            ) : (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
