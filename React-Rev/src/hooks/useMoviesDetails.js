import { useEffect, useState } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY.trim();
// const API_OPTIONS = {
//     method: 'GET',
//     headers: {accept:'application/json' , Autherization:`Bearer ${API_KEY}`},
// }
export const useMoviesDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [movieProviders, setMovieProviders] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      // console.log("Movie ID:", movieId);
      // console.log("My API Key is:", API_KEY);
      try {
        const requests = [
          fetch(
            `${API_BASE_URL}/movie/${movieId}?language=en-US&api_key=${API_KEY}`
          ),
          fetch(
            `${API_BASE_URL}/movie/${movieId}/recommendations?language=en-US&api_key=${API_KEY}`
          ),
          fetch(
            `${API_BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
          ),
          fetch(
            `${API_BASE_URL}/movie/${movieId}/credits?language=en-US&api_key=${API_KEY}`
          ),
          fetch(`${API_BASE_URL}/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`)
        ];
        const responses = await Promise.all(requests);
        const [
          movieResponse,
          recommendationsResponse,
          movieProvidersResponse,
          castResponse,
          trailerResponse,
        ] = responses;

        if (!movieResponse.ok || !recommendationsResponse.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const dataPromises = [
          movieResponse.json(),
          recommendationsResponse.json(),
          movieProvidersResponse.json(),
          castResponse.json(),
          trailerResponse.json(),

        ];

        const [movieData, recommendationsData, movieProvidersData, castData , trailerData] =
          await Promise.all(dataPromises);

        setMovie(movieData);
        setRecommendations(recommendationsData.results);
        setMovieProviders(movieProvidersData.results);
        setCast(castData.cast.slice(0, 10));

        // finding the director's name
        const directorData = castData.crew.find(
          (member) => member.job === "Director"
        );
        setDirector(directorData);

        const officialTrailer = trailerData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        const fallBackVideo = trailerData.results[0]

        //fallback if video not found
        setTrailerKey(officialTrailer ? officialTrailer.key : fallBackVideo.key);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);
  return { movie, loading, error, recommendations, movieProviders, cast, director, trailerKey };
};
