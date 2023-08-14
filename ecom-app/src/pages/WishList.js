import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./WishList.css";

export default function WishList() {
  const { wishlist, removeItem, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleRemoveItem = (item) => {
    removeItem(item);
    toast.warning("Item removed from wishlist!"); // Show remove toast message
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    toast.success("Item added to cart!"); // Show add to cart toast message
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.info("Wishlist cleared!"); // Show wishlist cleared toast message
  };

  return (
    <div className="wishlist-container">
      <h3 className="wishlist-heading">{wishlist.length} items in your wishlist</h3>
      {wishlist.map((item) => (
        <div className="wishlist-item" key={item._id}>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="item-thumbnail"
          />
          <div>
            <p className="item-title">{item.title}</p>
            <p className="item-price">Price: INR {item.price}</p>
            <div className="item-buttons">
              <button className="item-button" onClick={() => handleRemoveItem(item)}>Remove</button>
              <button className="item-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
      <div className="clear-button-container">
        <button className="clear-button" onClick={handleClearWishlist}>Clear Wishlist</button>
      </div>
    </div>
  );
}
