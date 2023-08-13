import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [cartButton, setCartButton] = useState("Add to Cart");
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setCartButton("Go to Cart");
    toast.success(`item added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist({ ...product, quantity: 1 });
    toast.info(`item added to wishlist!`);
  };

  const handleGoToCart = () => {
    navigate("/cart");
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
        <div className="product-buttons">
          <button className="add-to-cart-btn" onClick={() => cartButton === "Add to Cart" ? handleAddToCart(product) : handleGoToCart()}>
            {cartButton}
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
