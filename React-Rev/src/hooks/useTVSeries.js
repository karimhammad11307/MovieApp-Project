import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";


const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY =import.meta.env.VITE_TMDB_API_KEY;

export const useTVSeries = (selectedGenre) =>{
    const [searchTerm,setSearchTerm] = useState('');
    const [tvList,setTvList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [debouncedSearchTerm] = useDebounce(searchTerm,500);

    const fetchTVSeries = async (query,genreID) =>{
        setLoading(true);
        setErrorMessage('')

        try{
            let endpoint;
            if(query){
                endpoint = `${API_BASE_URL}/search/tv?/query=${encodeURIComponent(query)}&api_key=${API_KEY}`;
            }
            else if(genreID){
                endpoint = `${API_BASE_URL}/discover/tv?with_genres=${genreID}&api_key=${API_KEY}`
            }
            else{
                endpoint = `${API_BASE_URL}/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}`
            }
            const response = await fetch(endpoint);
            if(!response.ok) throw new Error('Error fetching TV series');

            const data = await response.json();

            if (data.results){
                setTvList(data.results);
            }
            else{
                setTvList([])
            }

        }
        catch(error){
            console.error(`Error fetching TV series: ${error}`)
            setErrorMessage('Error fetching TV series')
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTVSeries(debouncedSearchTerm, selectedGenre);
    },[debouncedSearchTerm, selectedGenre])

    return{
        searchTerm,
        setSearchTerm,
        tvList,
        loading,
        errorMessage
    };
};