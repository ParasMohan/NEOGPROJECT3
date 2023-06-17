import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { moveItemFromCartToWishlist } from "../Alerts/Alerts";

export default function Cart() {
  const {
    cart,
    removeItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const handleRemoveItem = (item) => {
    removeItem(item);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleIncreaseQuantity = (item) => {
    increaseQuantity(item);
  };

  const handleDecreaseQuantity = (item) => {
    decreaseQuantity(item);
  };

  const handleAddToWishlist = (item) => {
    addToWishlist(item);
    moveItemFromCartToWishlist(item); // Show the alert
  };

  return (
    <div>
      <h3>{cart.length} items in your cart</h3>
      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid black",
            margin: "0.5rem",
            padding: "0.5rem"
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{ width: "100px" }}
          />
          {item.title} - Quantity: {item.quantity}
          <p>Price: INR {item.price}</p>
          <button onClick={() => handleIncreaseQuantity(item)}>+</button>
          <button onClick={() => handleDecreaseQuantity(item)}>-</button>
          <button onClick={() => handleRemoveItem(item)}>Remove</button>
          <button onClick={() => handleAddToWishlist(item)}>
            Add to Wishlist
          </button>
        </div>
      ))}
      <div style={{ textAlign: "right", margin: "1rem" }}>
        Total:{" "}
        {cart.reduce(
          (totalPrice, item) => (totalPrice += item.price * item.quantity),
          0
        )}
      </div>
      <button onClick={handleClearCart}>Clear Cart</button>
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
}
