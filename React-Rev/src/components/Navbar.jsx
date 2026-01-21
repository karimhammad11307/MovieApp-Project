import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onGenreSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {user , logout} = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileGenresOpen, setIsMobileGenresOpen] = useState(false);


  const scrollToSection = (sectionId) => {
    // if we're already on the home page scroll immeditaly
     setIsMobileMenuOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { section: sectionId } });
      }
    }
  };
  
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
  const handleGenreClick = (genreId) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if(onGenreSelect) {
      onGenreSelect(genreId);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  }
  return (
    <nav className="fixed w-full z-50 top-0 start-0 bg-primary/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center py-4">
          
          {/* 1. LOGO & BURGER ICON WRAPPER */}
          <div className="flex items-center justify-between w-full md:w-auto">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
              <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="self-center text-2xl font-bold whitespace-nowrap text-white group-hover:text-blue-400 transition-colors">
                MovieApp
              </span>
            </Link>

            {/* MOBILE BURGER BUTTON (Hidden on Desktop) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* 2. DESKTOP NAVIGATION (Hidden on Mobile) */}
          <div className="hidden md:block">
            <ul className="flex flex-row space-x-8 rtl:space-x-reverse font-medium text-sm items-center">
              <li>
                <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <button onClick={() => scrollToSection("trending")} className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">
                  Trending
                </button>
              </li>
              
              {/* Desktop Genre Dropdown */}
              <li className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <button className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1">
                  Genres
                  <svg className={`w-2.5 h-2.5 ms-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 pt-4 w-44">
                    <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                      <ul className="py-2 text-sm text-gray-200 max-h-60 overflow-y-auto custom-scrollbar">
                        {genres.map((genre) => (
                          <li key={genre.id}>
                            <button onClick={() => handleGenreClick(genre.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors">
                              {genre.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* 3. DESKTOP AUTH BUTTONS (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
                  Log Out
                </button>
                <Link to="/profile" className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white/20 overflow-hidden hover:border-blue-400 transition-colors">
                  <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="User Avatar" className="w-full h-full object-cover" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">Login</Link>
                <Link to="/signup" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-full text-sm px-6 py-2.5 transition-all shadow-lg shadow-blue-600/30">Sign Up</Link>
              </>
            )}
          </div>

        </div>

        {/* 4. MOBILE MENU OVERLAY (Visible only when isMobileMenuOpen is true) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 animate-in slide-in-from-top-5 fade-in duration-200">
            <ul className="flex flex-col space-y-4 pt-4 font-medium text-base">
              <li>
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-blue-400 px-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("trending")} 
                  className="block text-gray-300 hover:text-blue-400 px-2 w-full text-left"
                >
                  Trending
                </button>
              </li>

              {/* Mobile Genres Accordion */}
              <li>
                <button 
                  onClick={() => setIsMobileGenresOpen(!isMobileGenresOpen)}
                  className="flex items-center justify-between w-full text-gray-300 hover:text-blue-400 px-2"
                >
                  <span>Genres</span>
                  <svg className={`w-3 h-3 transition-transform ${isMobileGenresOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                
                {/* Nested List for Genres */}
                {isMobileGenresOpen && (
                  <div className="mt-2 ml-4 pl-4 border-l border-gray-700 space-y-2 max-h-60 overflow-y-auto">
                    {genres.map((genre) => (
                      <button 
                        key={genre.id}
                        onClick={() => handleGenreClick(genre.id)}
                        className="block w-full text-left text-sm text-gray-400 hover:text-white py-1"
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* Mobile Auth Buttons */}
              <li className="pt-4 border-t border-gray-700">
                 {user ? (
                   <div className="flex flex-col space-y-3 px-2">
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-300 hover:text-white">
                         <div className="w-8 h-8 rounded-full overflow-hidden">
                           <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="Avatar" />
                         </div>
                         <span>My Profile</span>
                      </Link>
                      <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-300">
                        Log Out
                      </button>
                   </div>
                 ) : (
                   <div className="flex flex-col space-y-3 px-2">
                     <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white">Login</Link>
                     <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-blue-400 hover:text-blue-300">Sign Up</Link>
                   </div>
                 )}
              </li>
            </ul>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
