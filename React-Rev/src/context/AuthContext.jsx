import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('movieAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters" }
    }
    const mockUser = {
      id: "user_123",
      name: email.split("@")[0],
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=random`
    };
    setUser(mockUser);
    localStorage.setItem('movieAppUser', JSON.stringify(mockUser));
    return { success: true };
  };

  const signup = (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required" };
    }
    const mockUser = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
    };
    setUser(mockUser);
    localStorage.setItem('movieAppUser', JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieAppUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}