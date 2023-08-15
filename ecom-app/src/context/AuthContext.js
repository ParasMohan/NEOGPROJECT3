import React, { createContext, useState } from "react";
import axios from "axios";


import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  const location = useLocation()
  const signIn = async (email, password) => {
    try {
      const res = await axios.post("api/auth/login", { email, password });
      const { encodedToken, foundUser } = res.data;
      localStorage.setItem("token", encodedToken);
      localStorage.setItem("user", JSON.stringify(foundUser)); // Store user data as a string
      setUser(foundUser);
      setToken(encodedToken);

      if(location?.state?.from?.pathname)
      navigate(location?.state?.from?.pathname);
        else navigate("/", { replace: true });

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
      setToken(encodedToken);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({});
    setToken(false);
    navigate('/')
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, signOut, token,setToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

