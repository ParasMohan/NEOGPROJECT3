import React, { useState } from "react";

const AddressList = ({ addresses, onEdit, onDelete, onSelectAddress }) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
    onSelectAddress(addresses[index]); // Pass the selected address to the parent component
  };

  return (
    <div>
      {addresses.map((address, index) => (
        <div key={index}>
          <input
            type="radio"
            name="selectedAddress"
            checked={selectedAddressIndex === index}
            onChange={() => handleSelectAddress(index)}
          />
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

export default AddressList;
