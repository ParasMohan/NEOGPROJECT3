import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataContext";
import "./Checkout.css"; // Import the CSS file

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState("");
  const { userData } = useContext(DataContext);

  useEffect(() => {
    if (userData.primaryAddress) {
      setSelectedAddress(userData.primaryAddress);
    }
  }, [userData.primaryAddress]);

  // Update selected address when changed from profile page
  const handleSelectAddress = (address) => {
    setSelectedAddress(address.id);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.warning("Please select an address before placing an order");
      return;
    }

    // Perform the order placement logic here
    // You can clear the cart and perform any other necessary actions
    clearCart();
    navigate("/order-confirmation"); // Navigate to the order confirmation page
    toast.success("Your order has been placed successfully!");
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="address-section">
        <h3>Select Address</h3>
        {/* Dummy Addresses */}
        <div className="address-card">
          <input
            type="radio"
            id="address-1"
            name="address"
            value="address-1"
            checked={selectedAddress === "address-1"}
            onChange={() =>
              handleSelectAddress({
                id: "address-1",
                name: "John Doe",
                postalCode: "12345",
                state: "Anytown",
                city: "NY"
              })
            }
          />
          <label htmlFor="address-1">
            <h3>John Doe</h3>
            <p>1234 Elm Street</p>
            <p>Anytown, NY 12345</p>
          </label>
        </div>
        <div className="address-card">
          <input
            type="radio"
            id="address-2"
            name="address"
            value="address-2"
            checked={selectedAddress === "address-2"}
            onChange={() =>
              handleSelectAddress({
                id: "address-2",
                name: "Jane Smith",
                postalCode: "67890",
                state: "Another Town",
                city: "CA"
              })
            }
          />
          <label htmlFor="address-2">
            <h3>Jane Smith</h3>
            <p>5678 Oak Avenue</p>
            <p>Another Town, CA 67890</p>
          </label>
        </div>
        {/* End of Dummy Addresses */}
        {userData.addresses.map((address) => (
          <div className="address-card" key={address.id}>
            <input
              type="radio"
              id={`address-${address.id}`}
              name="address"
              value={address.id}
              checked={selectedAddress === address.id}
              onChange={() => handleSelectAddress(address)}
            />
            <label htmlFor={`address-${address.id}`}>
              <h3>{address.name}</h3>
              <p>{address.postalCode}</p>
              <p>{address.state}</p>
              <p>{address.city}</p>
            </label>
          </div>
        ))}
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item._id} className="order-item">
            <span>{item.title}</span>
            <span>Quantity: {item.quantity} - Price: {item.price}</span>
          </div>
        ))}
        <div>Total: ${cartTotal}</div>
      </div>
      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}
