import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Address from "../data/Address";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Perform the necessary actions to place the order
    clearCart();
    navigate("/"); // Navigate to the home page after placing the order
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h3>
        Total: $
        {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
      </h3>

      <h3>Shipping Address</h3>
      <div>
        {Address.map((address) => (
          <div key={address._id}>
            <h3>Name: {address.name}</h3>
            <p>Address: {address.address}</p>
            <p>City: {address.city}</p>
            <p>State: {address.state}</p>
            <p>Postal Code: {address.postalCode}</p>
            <p>Phone Number: {address.phoneNumber}</p>
          </div>
        ))}
      </div>

      <h3>Order Summary</h3>
      <div>
        {cart.map((item) => (
          <div key={item._id}>
            <p>Title: {item.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>

      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
