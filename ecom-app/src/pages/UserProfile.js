import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useContext } from "react";
import { AuthContext } from "..";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddressList from "./AddressList";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { userData, addAddress, editAddress, deleteAddress } = useData();
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [addressIndexToEdit, setAddressIndexToEdit] = useState(null);
  const navigate = useNavigate();

  const toggleAddressForm = () => {
    setAddressFormVisible(!addressFormVisible);
    setAddressIndexToEdit(null);
  };

  const handleAddEditAddress = (address) => {
    if (addressIndexToEdit !== null) {
      editAddress(addressIndexToEdit, address);
      toast.success("Address updated successfully!");
    } else {
      addAddress(address);
      toast.success("Address added successfully!");
    }
    toggleAddressForm();
  };

  const handleEditAddress = (index) => {
    setAddressFormVisible(true);
    setAddressIndexToEdit(index);
  };

  const handleDeleteAddress = (index) => {
    deleteAddress(index);
    toast.success("Address deleted successfully!");
  };

  const setPrimaryAddress = (selectedAddress) => {
    const updatedUserData = {
      ...userData,
      primaryAddress: selectedAddress,
    };

    localStorage.setItem("user", JSON.stringify(updatedUserData));
    toast.success("Primary address changed successfully!");
  };

  const AddressForm = ({ address, onSubmit }) => {
    const [street, setStreet] = useState(address ? address.street : "");
    const [city, setCity] = useState(address ? address.city : "");
    const [state, setState] = useState(address ? address.state : "");

    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({ street, city, state });
      setStreet("");
      setCity("");
      setState("");
    };


    return (
      <form onSubmit={handleSubmit}>
        <label>
          Street:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save Address</button>
      </form>
    );
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.firstName} {user.lastName}</p>
          <p>Email: {user.email}</p>

          <h2>Addresses</h2>
          <button onClick={toggleAddressForm}>
            {addressFormVisible ? "Close Address Form" : "Add Address"}
          </button>
          {addressFormVisible && (
            <AddressForm
              address={addressIndexToEdit !== null ? userData.addresses[addressIndexToEdit] : null}
              onSubmit={handleAddEditAddress}
            />
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
       <AddressList
        addresses={userData.addresses}
        onEdit={handleEditAddress}
        onDelete={handleDeleteAddress}
        onSelectAddress={(selectedAddress) => {
          setPrimaryAddress(selectedAddress);
        }}
      />
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
