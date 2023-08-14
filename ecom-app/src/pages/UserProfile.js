import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useContext } from "react";
import { AuthContext } from "..";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddressList from "./AddressList";
import "react-toastify/dist/ReactToastify.css";
import "./UserProfile.css"; // Include the CSS file for styling

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { userData, addAddress, editAddress, deleteAddress } = useData();
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [addressIndexToEdit, setAddressIndexToEdit] = useState(null);
  const [shownToasts, setShownToasts] = useState([]); // Keep track of shown toasts
  const navigate = useNavigate();

  const toggleAddressForm = () => {
    setAddressFormVisible(!addressFormVisible);
    setAddressIndexToEdit(null);
  };

  const handleEditAddress = (index) => {
    setAddressFormVisible(true);
    setAddressIndexToEdit(index);
  };

  const handleAddEditAddress = (address) => {
    if (addressIndexToEdit !== null) {
      editAddress(addressIndexToEdit, address);
      showToast("Address updated successfully!");
    } else {
      addAddress(address);
      showToast("Address added successfully!");
    }
    toggleAddressForm();
  };

  const handleDeleteAddress = (index) => {
    deleteAddress(index);
    showToast("Address deleted successfully!");
  };

  const setPrimaryAddress = (selectedAddress) => {
    const updatedUserData = {
      ...userData,
      primaryAddress: selectedAddress,
    };

    localStorage.setItem("user", JSON.stringify(updatedUserData));
    showToast("Primary address changed successfully!");
  };

  const showToast = (message) => {
    if (!shownToasts.includes(message)) {
     toast.success(message);
      setShownToasts([...shownToasts, message]);
    }
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
      <form className="address-form" onSubmit={handleSubmit}>
        <label>
          Name:
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
    <div className="container">
      {/* <h1 className="heading">User Profile</h1> */}
      {user ? (
        <div>
          <p className="user-info">
            Name: {user.firstName} {user.lastName}
          </p>
          <p className="user-info">Email: {user.email}</p>

          <h2 className="section-heading">Addresses</h2>
          <button
            className="add-address-btn"
            onClick={toggleAddressForm}
          >
            {addressFormVisible ? "Close Address Form" : "Add Address"}
          </button>
          {addressFormVisible && (
            <AddressForm
              address={
                addressIndexToEdit !== null
                  ? userData.addresses[addressIndexToEdit]
                  : null
              }
              onSubmit={handleAddEditAddress}
            />
          )}
        </div>
      ) : (
        <p className="loading-message">Loading user data...</p>
      )}
      <AddressList
        addresses={userData.addresses}
        onEdit={handleEditAddress}
        onDelete={handleDeleteAddress}
        onSelectAddress={(selectedAddress) => {
          setPrimaryAddress(selectedAddress);
        }}
        editButtonClass="edit-address-btn"
        deleteButtonClass="delete-address-btn"
      />
     
    </div>
  );
};

export default UserProfile;
