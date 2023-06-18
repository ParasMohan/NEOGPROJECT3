
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { addItemToCart, addItemToWishlist } from "../Alerts/Alerts";

export default function ProductCard(product) {
  const {
    _id,
    thumbnail,
    title,
    description,
    noDescription,
    rating,
    price
  } = product;

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    addItemToCart(product); // Show the alert
  };

  const handleAddToWishlist = (product) => {
    addToWishlist({ ...product, quantity: 1 });
    addItemToWishlist(product); // Show the alert
  };

  return (
    <div
      key={_id}
      style={{
        border: "1px solid gray",
        margin: "0.5rem",
        padding: "0.5rem"
      }}
    >
      <img src={thumbnail} alt={title} style={{ width: "100%" }} />
      <h2>
        {title} <br />
        <small>Price: $ {price}</small>
      </h2>
      <h4>Rating: {rating}</h4>

      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
      <button onClick={() => handleAddToWishlist(product)}>
        Add to Wishlist
      </button>
      {!noDescription && <Link to={`/product/${_id}`}> View Details </Link>}
      {noDescription && <p> {description} </p>}
    </div>
  );
}
