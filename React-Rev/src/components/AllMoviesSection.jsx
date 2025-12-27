import React from 'react'
import MovieCard from './MovieCard'
import Spinner from './Spinner'

const AllMoviesSection = ({ loading, errorMessage, moviesList ,title }) => {
  return (
    <section className="all-movies">
      <h2>{title || "All Movies"} </h2>
      
      {loading ? (
        <Spinner /> 
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {moviesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  )
}
export default AllMoviesSection