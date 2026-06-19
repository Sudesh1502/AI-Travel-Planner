"use client"
import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "@/services/auth.service.js";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      setUser(data);
    } catch (error) {
      toast.error(
          error.response?.data?.message || "Failed to load user."
        );
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
      toast.error(
          error.response?.data?.message || "Failed to load trip data"
        );
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