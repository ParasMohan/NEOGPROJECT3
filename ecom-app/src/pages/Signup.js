import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useContext } from "react";
import { AuthContext } from "..";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { userData, addAddress, editAddress, deleteAddress } = useData();
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [addressIndexToEdit, setAddressIndexToEdit] = useState(null);

  const toggleAddressForm = () => {
    setAddressFormVisible(!addressFormVisible);
    setAddressIndexToEdit(null);
  };

  const handleAddEditAddress = (address) => {
    if (addressIndexToEdit !== null) {
      editAddress(addressIndexToEdit, address);
    } else {
      addAddress(address);
    }
    toggleAddressForm();
  };

  const handleEditAddress = (index) => {
    setAddressFormVisible(true);
    setAddressIndexToEdit(index);
  };

  const handleDeleteAddress = (index) => {
    deleteAddress(index);
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
              address={
                addressIndexToEdit !== null
                  ? userData.addresses[addressIndexToEdit]
                  : null
              }
              onSubmit={handleAddEditAddress}
            />
          )}
          {userData && userData.addresses ? (
            <AddressList
              addresses={userData.addresses}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
            />
          ) : (
            <p>No addresses available.</p>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
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

const AddressList = ({ addresses, onEdit, onDelete }) => {
  return (
    <div>
      {addresses.map((address, index) => (
        <div key={index}>
          <p>
            Street: {address.street}, City: {address.city}, State: {address.state}
          </p>
          <button onClick={() => onEdit(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
