import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");  
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
