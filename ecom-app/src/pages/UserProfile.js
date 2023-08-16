import React, { useState, useContext } from "react";
import { useData } from "../context/DataContext";
import { AuthContext } from "..";
import { toast } from "react-toastify";
import AddressList from "./AddressList";
import AddressForm from "../components/AddressForm"; // Import the extended AddressForm component
import "react-toastify/dist/ReactToastify.css";
import "./UserProfile.css";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { userData, addAddress, editAddress, deleteAddress } = useData();
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [addressIndexToEdit, setAddressIndexToEdit] = useState(null);
  const [shownToasts, setShownToasts] = useState([]);

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

  return (
    <div className="container">
      {user ? (
        <div>
          <p className="user-info">
            Name: {user.firstName} {user.lastName}
          </p>
          <p className="user-info">Email: {user.email}</p>

          <h2 className="section-heading">Addresses</h2>
          <button className="add-address-btn" onClick={toggleAddressForm}>
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
