import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useSearchSuggestion = (searchTerm, searchType = 'movie') => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

    useEffect(() => {
        if(!debouncedSearchTerm || debouncedSearchTerm.length < 3) {
            setSuggestions([]) // clear suggestions if term is so short
            return;
        }
        const  fetchSuggestions = async () => {
            setLoading(true);
            try{
                const endpoint = `${API_BASE_URL}/search/${searchType}?query=${encodeURIComponent(debouncedSearchTerm)}&api_key=${API_KEY}`;
                const response = await fetch(endpoint);
                if(!response.ok){
                    throw new Error('Failed to fetch suggestions');
                }
                const data = await response.json();
                setSuggestions(data.results.slice(0,5));
            }
            catch(error){
                console.error('Error fetching suggestions:', error);
                setSuggestions([])
            }
            finally{
                setLoading(false);
            }
        };
        fetchSuggestions();
    
    }, [debouncedSearchTerm, searchType])
    return {suggestions, loading}

}