import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Checkout.css"; // Import the CSS file

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
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
        NOTE: Please choose a dummy address to place an order successfully.
      </p>

      <div className="address-section">
        <h3>Select Address</h3>
        {/* Dummy Addresses */}
        <div className="address-card">
          <input
            type="radio"
            id="address-1"
            name="address"
            value="address-1"
            onChange={() => setSelectedAddress("address-1")}
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
            onChange={() => setSelectedAddress("address-2")}
          />
          <label htmlFor="address-2">
            <h3>Jane Smith</h3>
            <p>5678 Oak Avenue</p>
            <p>Another Town, CA 67890</p>
          </label>
        </div>
        {/* End of Dummy Addresses */}
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
