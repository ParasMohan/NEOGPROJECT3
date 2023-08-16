import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../context/DataContext";
import "./Checkout.css";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { userData } = useData();
  const [selectedAddress, setSelectedAddress] = useState("");

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.warning("Please choose an address to checkout.");
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
      <p style={{ color: "red" }}>
        NOTE: Please choose an address to place an order successfully.
      </p>

      <div className="address-section">
        <h3>Select Address</h3>
        {/* Display user's saved addresses from userData */}
        {userData.addresses.map((address, index) => (
          <div key={index} className="address-card">
            <input
              type="radio"
              id={`address-${index}`}
              name="address"
              value={`address-${index}`}
              onChange={() => setSelectedAddress(address)}
            />
            <label htmlFor={`address-${index}`}>
              <h3>{address.fullName}</h3>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.postalCode}
              </p>
            </label>
          </div>
        ))}

        {/* Display hardcoded addresses */}
        <div className="address-card">
          <input
            type="radio"
            id="hardcoded-address-1"
            name="address"
            value="hardcoded-address-1"
            onChange={() => setSelectedAddress("Hardcoded Address 1")}
          />
          <label htmlFor="hardcoded-address-1">
            <h3>Chris Pratt (Dummy 1 )</h3>
            <p>1234 Elm Street</p>
            <p>Anytown, NY 12345</p>
          </label>
        </div>
        <div className="address-card">
          <input
            type="radio"
            id="hardcoded-address-2"
            name="address"
            value="hardcoded-address-2"
            onChange={() => setSelectedAddress("Hardcoded Address 2")}
          />
          <label htmlFor="hardcoded-address-2">
            <h3>John Doe (Dummy 2)</h3>
            <p>5678 Oak Avenue</p>
            <p>Another Town, CA 67890</p>
          </label>
        </div>
        {/* End of hardcoded addresses */}
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item._id} className="order-item">
            <span>{item.title}</span>
            <span>
              Total Quantity: {item.quantity} - Price: $ {item.price}
            </span>
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
