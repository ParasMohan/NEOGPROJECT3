import React, { useState } from "react";

const AddressForm = ({ address, onSubmit }) => {
  const [fullName, setFullName] = useState(address ? address.fullName : "");
  const [street, setStreet] = useState(address ? address.street : "");
  const [city, setCity] = useState(address ? address.city : "");
  const [state, setState] = useState(address ? address.state : "");
  const [postalCode, setPostalCode] = useState(address ? address.postalCode : "");
  const [country, setCountry] = useState(address ? address.country : "");
  const [phoneNumber, setPhoneNumber] = useState(address ? address.phoneNumber : "");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ fullName, street, city, state, postalCode, country, phoneNumber });
    setFullName("");
    setStreet("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
    setPhoneNumber("");
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </label>
      <label>
        Street Address:
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
      <label>
        Postal Code:
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save Address</button>
    </form>
  );
};

export default AddressForm;
