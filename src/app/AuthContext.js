"use client"
import { createContext, useContext, useState, useEffect } from 'react'
import axios from "axios"
import { useRouter } from "next/navigation"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idUser, setIdUser] = useState('');

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idUser_response = localStorage.getItem("idUser");
    if (token) {
      setIsAuthenticated(true);
      setIdUser(idUser_response);
    }
  }, []);

  const login = () => {
    const idUser_response = localStorage.getItem("idUser");
    setIsAuthenticated(true);
    setIdUser(idUser_response);
  }
  const logout = async () => {
    try {
        const res = await axios.get("/api/auth/logout");
        router.push("/login");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        localStorage.removeItem("idUser");
        setIdUser('');
      } catch (error) {
        console.error(error.message);
      }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, idUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth () { return useContext(AuthContext); } 
