🎬 Movie Discovery App

A modern, responsive, and feature-rich movie discovery application built with React, designed to help users find their next favorite film with ease.

(Note: Replace public/hero.png with an actual screenshot path if available, or keep it generic)

🚀 Features

🔍 Smart Search & Discovery

Live Search Suggestions: Instant dropdown results as you type (debounced for performance).

Trending Movies: Showcase of the most popular films of the week.

Genre Filtering: Easily browse movies by category directly from the navigation bar.

📄 Detailed Movie Information

Comprehensive Details: View release date, runtime, rating, genres, and a full plot overview.

Dynamic Recommendations: "More Like This" section powered by TMDB's recommendation engine to keep users engaged.

Interactive Ratings: Users can rate movies with a custom-built, interactive star rating component.

🔐 User Authentication (Frontend Simulation)

Login & Sign Up Flows: Complete UI/UX for user onboarding with form validation.

Persistent Session: Uses localStorage and React Context API to remember logged-in users across refreshes.

Personalized Header: The navigation bar adapts to show the user's avatar and name when logged in.

🎨 Modern UI/UX

Glassmorphism Design: Sleek, translucent navbar and cards using modern CSS techniques.

Fully Responsive: Optimized for mobile, tablet, and desktop screens.

Loading States: Elegant skeleton loaders and spinners for a smooth user experience.

🛠️ Tech Stack

Frontend Framework: React 18 (Vite)

Styling: Tailwind CSS

Routing: React Router DOM (v6)

State Management: React Context API & Custom Hooks

Data Source: The Movie Database (TMDB) API

Icons: Lucide React & Heroicons

📂 Project Structure

This project follows a professional, scalable architecture separating Logic (Hooks), Views (Pages), and UI (Components).

src/
├── components/          # Reusable UI widgets
│   ├── MovieCard.jsx    # Individual movie display card
│   ├── Navbar.jsx       # Responsive navigation bar
│   ├── Search.jsx       # Search bar with autocomplete dropdown
│   ├── Rating.jsx       # Interactive star rating system
│   ├── Spinner.jsx      # Loading indicator
│   └── ...
├── context/             # Global State
│   └── AuthContext.jsx  # Handles user login/signup state
├── hooks/               # Custom Logic & API Calls
│   ├── useMovies.js     # Fetches trending & discovered movies
│   ├── useMoviesDetails.js # Fetches single movie info + recommendations
│   └── useSearchSuggestions.js # Handles live search logic
├── pages/               # Main Route Views
│   ├── Home.jsx         # Landing page dashboard
│   ├── MovieDetails.jsx # Detailed movie view
│   ├── Login.jsx        # Authentication pages
│   └── Signup.jsx
├── App.jsx              # Main Router setup
└── main.jsx             # Entry point


🚀 Getting Started

Follow these steps to run the project locally.

Prerequisites

Node.js (v14 or higher)

npm or yarn

Installation

Clone the repository

git clone [https://github.com/yourusername/movie-discovery-app.git](https://github.com/yourusername/movie-discovery-app.git)
cd movie-discovery-app


Install dependencies

npm install


Set up Environment Variables
Create a .env file in the root directory and add your TMDB API key:

VITE_TMDB_API_KEY=your_api_key_here


Run the development server

npm run dev


Open http://localhost:5173 in your browser.


🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License

This project is open source and available under the MIT License.
