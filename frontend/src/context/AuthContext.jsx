import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [userRole, setUserRole] = useState('');


  useEffect(() => {
    // Sincronizar el token con localStorage
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('jwt');
      setToken(newToken);
      if (newToken) {
        const decoded = jwtDecode(newToken);

        setUserRole(decoded.rol);
      } else {
        setUserRole(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);