import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  // On mount, auto-login if email exists in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('makerport_email');
    if (saved) {
      setEmail(saved);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userEmail) => {
    setEmail(userEmail);
    setIsLoggedIn(true);
    localStorage.setItem('makerport_email', userEmail);
  };

  const logout = () => {
    setEmail('');
    setIsLoggedIn(false);
    localStorage.removeItem('makerport_email');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, email, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
