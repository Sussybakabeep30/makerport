import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  //loading from localstorage if exists
  useEffect(() => {
    const saved = localStorage.getItem("makerport_email");
    if (saved) {
      const cleaned = saved.trim().toLowerCase();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
  
      if (isValid) {
        setEmail(cleaned);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("makerport_email");
      }
    }
  }, []);
  

  const login = (userEmail) => {
    const cleaned = userEmail.trim().toLowerCase();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
    if (!isValid) return;
  
    setEmail(cleaned);
    setIsLoggedIn(true);
    localStorage.setItem("makerport_email", cleaned);
  };
  
  const logout = () => {
    setEmail("");
    setIsLoggedIn(false);
    localStorage.removeItem("makerport_email");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, email, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
