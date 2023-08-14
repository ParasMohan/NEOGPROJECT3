import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../backend/db/products";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css"; // Import your CSS file for styling

export default function ProductDetail() {
  const { productId } = useParams();

  function getProductDetails(products, productId) {
    return products.find((product) => product._id === productId);
  }

  const product = getProductDetails(products, productId);

  return (
    <div className="product-detail-container">
      <ProductCard {...product} noDescription={true} />
      <Link to="/products" className="see-all-link">
        See All
      </Link>
    </div>
  );
}
