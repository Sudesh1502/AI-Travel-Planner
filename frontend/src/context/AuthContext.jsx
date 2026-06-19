"use client"
import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "@/services/auth.service.js";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchuser();
  }, []);

  const fetchuser = async () => {
    try {
      setLoading(true);
      const data = await getCurrentUser();
      console.log("FETCHED USER DATA:", data);
      setUser(data);
    } catch (error) {
      console.log("FAILED TO FETCH USER:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      setUser(data)
      fetchuser();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);