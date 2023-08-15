import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      // Save token and user data to localStorage whenever they change
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [token, user]);

  const signIn = async (email, password) => {
    try {
      const res = await axios.post("api/auth/login", { email, password });
      const { encodedToken, foundUser } = res.data;
      setUser(foundUser);
      setToken(encodedToken);

      if (location?.state?.from?.pathname)
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
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, signOut, token, setToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
