import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("user");
    if (token && storedUserData) {
      const user = JSON.parse(storedUserData); // Parse stored user data
      setUserData(user);
    }
  }, []);

  return (
    <DataContext.Provider value={{ userData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
