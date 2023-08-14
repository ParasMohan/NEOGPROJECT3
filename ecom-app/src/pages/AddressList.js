import React, { useState } from "react";
import "./AddressList.css";
const AddressList = ({ addresses, onEdit, onDelete, onSelectAddress }) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
    onSelectAddress(addresses[index]); // Pass the selected address to the parent component
  };

  return (
    <div className="address-list">
      {addresses.map((address, index) => (
        <div className="address-item" key={index}>
          <input
            className="address-radio"
            type="radio"
            name="selectedAddress"
            checked={selectedAddressIndex === index}
            onChange={() => handleSelectAddress(index)}
          />
          <p className="address-details">
            Street: {address.street}, City: {address.city}, State: {address.state}
          </p>
          <button className="address-action-btn" onClick={() => onEdit(index)}>Edit</button>
          <button className="address-action-btn" onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
