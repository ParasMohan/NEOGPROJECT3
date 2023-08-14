import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

export default function Cart() {
  const {
    cart,
    removeItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const Navigate = useNavigate()

  const handleRemoveItem = (item) => {
    removeItem(item);
    toast.error("Item removed from cart!");
  };

  const handleClearCart = () => {
    clearCart();
    toast.warning("Your cart is now empty!");
  };

  const handleIncreaseQuantity = (item) => {
    increaseQuantity(item);
  };

  const handleDecreaseQuantity = (item) => {
    decreaseQuantity(item);
  };

  const handleAddToWishlist = (item) => {
    addToWishlist(item);
    toast.success("Item added to wishlist!");
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty. You cannot proceed to checkout.");
    } else {
      Navigate("/checkout")
    }
  };

  return (
    <div className="cart-container">
      <h3 className="cart-header">{cart.length} items in your cart</h3>
      {cart.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.thumbnail} alt={item.title} className="cart-item-thumbnail" />
          <div className="cart-item-details">
            <div className="cart-item-title">{item.title}</div>
            <div className="cart-item-quantity">
              <button className="quantity-button" onClick={() => handleDecreaseQuantity(item)}>
                -
              </button>
              {item.quantity}
              <button className="quantity-button" onClick={() => handleIncreaseQuantity(item)}>
                +
              </button>
            </div>
            <div className="cart-item-price">Price: $ {item.price}</div>
          </div>
          <div className="cart-item-buttons">
            <button className="remove-button" onClick={() => handleRemoveItem(item)}>
              Remove
            </button>
            <button className="wishlist-button" onClick={() => handleAddToWishlist(item)}>
              Add to Wishlist
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">Total: $
        {cart.reduce(
          (totalPrice, item) => (totalPrice += item.price * item.quantity),
          0
        )}
      </div>
      <div className="cart-actions">
        <button className="clear-button" onClick={handleClearCart}>
          Clear Cart
        </button>
        <button className="checkout-button" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
