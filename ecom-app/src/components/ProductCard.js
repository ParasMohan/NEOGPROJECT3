import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { addItemToCart, addItemToWishlist } from "../Alerts/Alerts";
import "./ProductCard.css"; // Import your CSS file for styling

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
    <div className="product-card">
      <div className="product-image-container">
        <img className="product-thumbnail" src={thumbnail} alt={title} />
      </div>
      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <div className="product-price-rating">
          <span className="product-price">${price}</span>
          <span className="product-rating">Rating: {rating}</span>
        </div>
        {/* <p className="product-description">{description}</p> */}
        <div className="product-buttons">
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
          <button className="add-to-wishlist-btn" onClick={() => handleAddToWishlist(product)}>
            Add to Wishlist
          </button>
        </div>
        {!noDescription && <Link to={`/product/${_id}`}> View Details </Link>}
      {noDescription && <p> {description} </p>}
      </div>
    </div>
  );
}
