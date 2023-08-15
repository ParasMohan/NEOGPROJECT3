import React, { createContext, useState, useContext, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    addresses: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("user");
    if (token && storedUserData) {
      const user = JSON.parse(storedUserData);
      // Initialize addresses if not present
      if (!user.addresses) {
        user.addresses = [];
      }
      setUserData(user);
    }
  }, []);

  const addAddress = (newAddress) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      addresses: [...prevUserData.addresses, newAddress],
    }));
  };

  const editAddress = (index, updatedAddress) => {
    setUserData((prevUserData) => {
      const updatedAddresses = [...prevUserData.addresses];
      updatedAddresses[index] = updatedAddress;
      return { ...prevUserData, addresses: updatedAddresses };
    });
  };
  const deleteAddress = (index) => {
    setUserData((prevUserData) => {
      const updatedAddresses = [...prevUserData.addresses];
      updatedAddresses.splice(index, 1);
      return { ...prevUserData, addresses: updatedAddresses };
    });
  };

  return (
    <DataContext.Provider value={{ userData, addAddress, editAddress, deleteAddress }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
