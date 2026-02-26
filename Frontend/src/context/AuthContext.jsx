import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for cookie on mount
    const token = Cookies.get('authToken');
    const storedUser = localStorage.getItem('activeUser');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
        localStorage.removeItem('activeUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Cookie is set by the backend with httpOnly: true, but we still track user state here
    localStorage.setItem('activeUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('authToken');
    localStorage.removeItem('activeUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
