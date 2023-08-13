import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { moveItemFromCartToWishlist } from "../Alerts/Alerts";
import "./Cart.css"; // Import your CSS file for styling

export default function Cart() {
  const {
    cart,
    removeItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
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
    <div className="cart-container">
      <h3 className="cart-header">{cart.length} items in your cart</h3>
      {cart.map((item) => (
        <div key={item._id} className="cart-item">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="cart-item-thumbnail"
          />
          <div className="cart-item-details">
            <div className="cart-item-title">{item.title}</div>
            <div className="cart-item-quantity">
              <button
                className="quantity-button"
                onClick={() => handleDecreaseQuantity(item)}
              >
                -
              </button>
              {item.quantity}
              <button
                className="quantity-button"
                onClick={() => handleIncreaseQuantity(item)}
              >
                +
              </button>
            </div>
            <div className="cart-item-price">Price: INR {item.price}</div>
          </div>
          <div className="cart-item-buttons">
            <button
              className="remove-button"
              onClick={() => handleRemoveItem(item)}
            >
              Remove
            </button>
            <button
              className="wishlist-button"
              onClick={() => handleAddToWishlist(item)}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">Total: INR
        {cart.reduce(
          (totalPrice, item) => (totalPrice += item.price * item.quantity),
          0
        )}
      </div>
      <div className="cart-actions">
        <button className="clear-button" onClick={handleClearCart}>
          Clear Cart
        </button>
        <Link to="/checkout">
          <button className="checkout-button">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}
