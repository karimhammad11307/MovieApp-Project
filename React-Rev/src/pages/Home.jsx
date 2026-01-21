import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import TrendingSection from "../components/TrendingSection";
import AllMoviesSection from "../components/AllMoviesSection";
import { useMovies } from "../hooks/useMovies";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

// 1. Genres list defined outside component (Best Practice)
const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
];

const Home = () => {
  // 2. Initialize State
  const [selectedGenre, setSelectedGenre] = useState(null);

  const {
    searchTerm,
    setSearchTerm,
    moviesList,
    trendingMovies,
    loading,
    errorMessage,
  } = useMovies(selectedGenre);

  const location = useLocation();

  // 3. Define the Handler BEFORE using it in useEffect
  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setSearchTerm("");

    setTimeout(() => {
      const element = document.getElementById("all-movies");
      if (element) {
        const yCoordinate =
          element.getBoundingClientRect().top + window.scrollY;
        const yOffset = -80;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
      }
    }, 50);
  };

  // 4. Effect for Genre Selection (CRASH FIX HERE)
  useEffect(() => {
    if (location.state && location.state.genreId) {
       // Only run if the genre is actually different to avoid redundant updates
       if (selectedGenre !== location.state.genreId) {
          handleGenreSelect(location.state.genreId);
       }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  // 5. Effect for Scrolling (Separate to avoid conflicts)
  useEffect(() => {
    if (location.state && location.state.section) {
      const sectionId = location.state.section;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location, trendingMovies]);

  const getSectionTitle = () => {
    if (searchTerm) return `Search Results for "${searchTerm}"`;

    if (selectedGenre) {
      const genre = genres.find((g) => g.id === selectedGenre);
      return genre ? `${genre.name} Movies` : "All Movies";
    } else {
      return "All Movies";
    }
  };

  return (
    <main className="min-h-screen bg-primary">
      <Navbar onGenreSelect={handleGenreSelect} />
      <div className="pt-28 pb-10 relative overflow-hidden">
        <div className="pattern absolute inset-0 opacity-40 z-0" />
        <div className="wrapper relative z-10 flex flex-col items-center text-center">
          <img
            src="./hero.png"
            alt="hero banner"
            className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-xl mb-6"
          />
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight max-w-5xl">
            Find{" "}
            <span className="text-gradient bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Movies
            </span>{" "}
            you will enjoy without the hassle
          </h1>
          <div className="w-full max-w-3xl">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="wrapper">
        <TrendingSection trendingMovies={trendingMovies} />
        <div id="all-movies" className="scroll-mt-24">
          <AllMoviesSection
            title={getSectionTitle()}
            loading={loading}
            errorMessage={errorMessage}
            moviesList={moviesList}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;