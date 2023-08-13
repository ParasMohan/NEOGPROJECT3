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
    setSelectedAddress(address);
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
        {userData.addresses.map((address) => (
          <div className="address-card" key={address.id}>
            <input
              type="radio"
              id={`address-${address.id}`}
              name="address"
              value={address.id}
              checked={selectedAddress === address.id}
              onChange={() => handleSelectAddress(address.id)}
            />
            <label htmlFor={`address-${address.id}`}>
              <h3>{address.name}</h3>
              <p>{address.postalCode}</p>
              <p>{address.state}</p>
              <p>{address.city}</p>
            </label>
          </div>
        ))}

        {/* Add the dummy addresses here */}
        <div className="address-card">
          <input
            type="radio"
            id="dummy-address-1"
            name="address"
            value="dummy-address-1"
            checked={selectedAddress === "dummy-address-1"}
            onChange={() => handleSelectAddress("dummy-address-1")}
          />
          <label htmlFor="dummy-address-1">
            <h3>Dummy Address 1</h3>
            <p>Dummy Postal Code 1</p>
            <p>Dummy State 1</p>
            <p>Dummy City 1</p>
          </label>
        </div>

        <div className="address-card">
          <input
            type="radio"
            id="dummy-address-2"
            name="address"
            value="dummy-address-2"
            checked={selectedAddress === "dummy-address-2"}
            onChange={() => handleSelectAddress("dummy-address-2")}
          />
          <label htmlFor="dummy-address-2">
            <h3>Dummy Address 2</h3>
            <p>Dummy Postal Code 2</p>
            <p>Dummy State 2</p>
            <p>Dummy City 2</p>
          </label>
        </div>
        {/* End of dummy addresses */}
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
