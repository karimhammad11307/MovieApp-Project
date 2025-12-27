import React from 'react'
import { Link } from 'react-router-dom';

const Search = ({ searchTerm, setSearchTerm, className, suggestions = [], loading = false }) => {

  return (
    <div className={`search relative ${className}`}>
      
      <div className="relative flex items-center ">
        {/*  Added 'absolute left-2 h-5 w-5' directly here */}
        <img src="/search.svg" alt="search" className="absolute left-2 h-5 w-5" />
        
        <input 
          type="text" 
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dropdown Container */}
      {(loading || suggestions.length > 0) && searchTerm.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-dark-100 rounded-b-2xl shadow-2xl z-50 overflow-hidden border border-gray-700 mt-2">
              
              {loading && (
                  <p className="text-gray-400 p-4 text-sm animate-pulse">Searching...</p>
              )}

              {/* Suggestions List */}
              <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-700"> 
                  {!loading && suggestions.map((movie) => (
                      <Link 
                        key={movie.id} 
                        to={`/movie/${movie.id}`} 
                        onClick={() => setSearchTerm('')} 
                        className="flex items-start gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                          {/* Poster Image */}
                          <img 
                              src={movie.poster_path ? `https://image.tmdb.org/t/p/w92/${movie.poster_path}` : '/no-movie.png'} 
                              alt={movie.title} 
                              // These classes will now work because we removed the CSS conflict!
                              className="w-16 h-24 object-cover rounded-md shadow-md shrink-0 group-hover:scale-105 transition-transform"
                          />
                          
                          {/* Text Details */}
                          <div className="flex flex-col justify-center h-full pt-1">
                              <h3 className="text-white text-lg font-bold line-clamp-1 group-hover:text-light-100">
                                  {movie.title}
                              </h3>
                              
                              <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
                                  <span className="flex items-center gap-1 font-medium">
                                      🗓 {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-yellow-500 font-bold">
                                      ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                  </span>
                              </div>
                          </div>
                      </Link>
                  ))}
              </div>

               {/* No Results Message */}
               {!loading && suggestions.length === 0 && searchTerm.length > 3 && (
                <div className="p-4 text-center text-gray-500 text-sm">
                    No results found for "<span className="text-white">{searchTerm}</span>"
                </div>
              )}
          </div>
      )}
    </div>
  )
}

export default Search