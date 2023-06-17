import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { moveItemFromWishlistToCart } from "../Alerts/Alerts";

export default function WishList() {
  const { wishlist, removeItem, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleRemoveItem = (item) => {
    removeItem(item);
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    moveItemFromWishlistToCart(item); // Show the alert
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  return (
    <div>
      <h3>{wishlist.length} items in your wishlist</h3>
      {wishlist.map((item) => (
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
          {item.title}
          <p>Price: INR {item.price}</p>
          <button onClick={() => handleRemoveItem(item)}>Remove</button>
          <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
        </div>
      ))}
      <div style={{ textAlign: "right", margin: "1rem" }}>
        <button onClick={handleClearWishlist}>Clear Wishlist</button>
      </div>
    </div>
  );
}
