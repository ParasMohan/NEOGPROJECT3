import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../backend/db/products";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { productId } = useParams();

  function getProductDetails(products, productId) {
    return products.find((product) => product._id === productId);
  }

  const product = getProductDetails(products, productId);

  return (
    <>
      <ProductCard {...product} noDescription={true} />
      <Link to="/category"> See All </Link>
    </>
  );
}
