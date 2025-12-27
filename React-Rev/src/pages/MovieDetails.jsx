import Spinner from "../components/Spinner";
import { useState } from "react";
import { useSearchSuggestion } from "../hooks/useSearchSuggestion";
import { useMoviesDetails } from "../hooks/useMoviesDetails";
import { useParams, Link, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Search from "../components/Search";
import Rating from "../components/Rating";
import Navbar from "../components/Navbar";

const MovieDetails = () => {
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const { suggestions, loading: searchLoading } =
    useSearchSuggestion(localSearchTerm);

  const { id } = useParams();
  // destructure from hooks
  const {
    movie,
    loading,
    error,
    recommendations,
    movieProviders,
    cast,
    director,
    trailerKey,
  } = useMoviesDetails(id);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // determine region
  const currentRegion = movieProviders?.EG || movieProviders?.US;

  const handleGenreNavigation = (genreId) => {
    navigate("/", { state: { genreId: genreId } });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-primary">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-primary">
        <p className="text-red-500">{error}</p>
        <Link to="/" className="ml-4 text-light-100 hover:text-white">
          Go Back
        </Link>
      </div>
    );
  if (!movie) return null;

  return (
    <main className="bg-primary min-h-screen w-full relative overflow-hidden flex-col items-center">
      <Navbar onGenreSelect={handleGenreNavigation} />
      <div className="pattern opacity-50" />
      <div className="w-full relative z-50"></div>
      <div className="wrapper relative z-10 w-full max-w-7xl pt-32 px-4">
        <Link
          to="/"
          className="text-light-200 hover:text-white mb-8 inline-block font-dm-sans text-lg"
        >
          ← Back to Home
        </Link>
        <Search
          className="bg-dark-100 mb-5"
          searchTerm={localSearchTerm}
          setSearchTerm={setLocalSearchTerm}
          suggestions={suggestions}
          loading={searchLoading}
        />
        {isTrailerOpen && trailerKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            {/* close button wrapper to close when clicking outside */}
            <div className="absolute inset-0" onClick={() => setIsTrailerOpen(false)}></div>
            <div className="relative w-full max-w-4xl aspect-video
            bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <button onClick={() => setIsTrailerOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-red-500 z-10 bg-black/50 p-2
              rounded-full">
                ✕
              </button>
              {/* youtube Iframe */}
              <iframe src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              title="Movie Trailer"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
              picture-in-picture"
              allowFullScreen
              className="w-full h-full">
              </iframe>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-10  items-start">
          <div className="w-full md:w-1/3 shrink-0">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "/no-movie.png"
              }
              alt={movie.title}
              className="w-full rounded-2xl shadow-lg border-4 border-dark-100"
            />
            {trailerKey && (
              <button onClick={() => setIsTrailerOpen(true)}
              className="mt-4 w-full bg-blue-800 hover:bg-blue-900 text-white font-bold
              py-3 rounded-lg flex items-center justify-center gap-2 transition-all
              shadow-lg shadow-red-600/20">
                Watch Trailer here
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                  
                </svg>
              </button>
            )}
          </div>
          <div className="w-full md:w-2/3 text-white font-dm-sans">
            <h1 className="text-4xl font-bold mb-3 text-light-100 flex">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-xl text-gray-400 italic mb-6">
                {movie.tagline}
              </p>
            )}
            <div className="flex flex-wrap gap-6 mb-8 text-light-200">
              <div className="flex items-center gap-2">
                <img src="/star.svg" alt="Star Icon" className="w-6 h-6" />
                <span className="font-bold text-lg">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} /
                  10
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{movie.runtime} min</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg uppercase">
                  {movie.original_language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "N/A"}
                </span>
              </div>
            </div>
            {/* Genres */}
            <div className="flex flex-wrap gap-3 mb-8">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-1.5 bg-dark-100
                            rounded-full text-sm text-gray-200 border border-gray-800"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <Rating />
            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-3 text-light-100">
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>
            {/* Additional Info if any  */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-800">
              <div>
                <h4 className="text-gray-500 text-sm mb-1">Status</h4>
                <p className="text-lg font-medium">{movie.status}</p>
              </div>
              <div>
                <h4 className="text-gray-500 text-sm mb-1">Budget</h4>
                <p className="text-lg font-medium">
                  {movie.budget > 0
                    ? `$${movie.budget.toLocaleString()}`
                    : "Unknown"}
                </p>
              </div>
              {director && (
                <div>
                  <h4 className="text-gray-500 text-sm mb-1">Director</h4>
                  <p className="text-lg font-medium text-white">
                    {director.name}
                  </p>
                </div>
              )}
            </div>
            {/* Cast Data */}
            {cast.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Meet the Cast
                </h2>
                <div className="flex overflow-x-auto gap-5 pb-4 hide-scrollbar">
                  {cast.map((actor) => (
                    <div
                      key={actor.id}
                      className="min-w-[140px] flex flex-col items-center"
                    >
                      {/* Actor Image */}
                      <div className="w-28 h-28 mb-3 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg relative group">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                              : "https://placehold.co/200x100/1a1a1a/FFF?text=Actor" // Fallback if no image found
                          }
                          alt={actor.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {/* Actor Name */}
                      <h4 className="text-white font-medium text-center leading-tight">
                        {actor.name}
                      </h4>
                      {/* Character Name */}
                      <p className="text-gray-500 text-sm text-center mt-1">
                        {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Movie Providers */}
            {currentRegion && (
              <div className="mt-6 bg-dark-100/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <h3 className="text-gray-400 text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span>Stream now </span>
                  <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">
                    {movieProviders.EG ? " EG" : " US"}
                  </span>
                </h3>
                {currentRegion.flatrate ? (
                  <div className="flex">
                    {currentRegion.flatrate.map((provider) => (
                      <div
                        key={provider.provider_id}
                        className="group relative"
                      >
                        <a
                          href={currentRegion.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-12 h-12 rounded-lg shadow-md group-hover:scale-110 group-hover:ring-2 ring-blue-500 transition-all cursor-pointer"
                            title={provider.provider_name}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic">
                    There are currently no streaming options for this movie, Try
                    to find it in Cinemas
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {/* New section for recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-6 text-white">
              More Like "{movie.title}"
            </h2>
            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recommendations.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};
export default MovieDetails;
