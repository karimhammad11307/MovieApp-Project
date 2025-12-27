import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { getTrendMovies, updateSearchCount } from '../appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// REMOVED 'searchTerm' from arguments to avoid conflict with state
export const useMovies = (selectedGenre) => { 
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Debounce the search term to prevent too many API calls
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchMovies = async (query, genreId) => {
    setLoading(true);
    setErrorMessage('');

    try {
      let endpoint;

      // PRIORITY 1: Search (If user types, ignore genre)
      if (query) {
        endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`;
      } 
      // PRIORITY 2: Genre (If no search, check genre)
      else if (genreId) {
        endpoint = `${API_BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`;
      } 
      // PRIORITY 3: Default (Popular movies)
      else {
        endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Error fetching movies');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Error fetching movies');
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  // TRIGGER: Fetch whenever Search Term OR Selected Genre changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm, selectedGenre);
  }, [debouncedSearchTerm, selectedGenre]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    moviesList,
    trendingMovies,
    loading,
    errorMessage
  };
};