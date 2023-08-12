import React, { createContext, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  
  const signIn = async (email, password) => {
    try {
      const res = await axios.post("api/auth/login", { email, password });
      const { encodedToken, foundUser } = res.data;
      localStorage.setItem("token", encodedToken);
      localStorage.setItem("user", JSON.stringify(foundUser)); // Store user data as a string
      setUser(foundUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  const signUp = async (userData) => {
    try {
      const res = await axios.post("api/auth/signup", userData);
      const { encodedToken, createdUser } = res.data;
      localStorage.setItem("token", encodedToken);
      localStorage.setItem("user", JSON.stringify(createdUser)); // Store user data as a string
      setUser(createdUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({});
    setIsLoggedIn(false);
    navigate('/')
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, signOut, isLoggedIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
