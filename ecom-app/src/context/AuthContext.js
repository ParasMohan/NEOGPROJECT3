import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export  function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  console.log(isLoggedIn);

  const signIn = async (email, password) => {
    try {
      const res = await axios.post("api/auth/login", { email, password });
      const { token, foundUser } = res.data;
      localStorage.setItem("token", token);
      setUser(foundUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, isLoggedIn, setIsLoggedIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
