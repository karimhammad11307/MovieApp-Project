import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import MovieDetails from './pages/MovieDetails'
import './App.css'
import { AuthProvider } from './context/AuthContext' // Import AuthProvider

const App = () => {
  return (
    <BrowserRouter>
      {/* Wrap all routes with AuthProvider */}
      <AuthProvider>
        <Routes>
          {/* When the user goes to "/", show the Home page */}
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App