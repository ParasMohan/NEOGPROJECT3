import React from "react";
import { useParams } from "react-router-dom";
import ProductCard  from "../components/ProductCard";
import { products } from "../backend/db/products";

export default function CategoryPage() {
  const { categoryName } = useParams();

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  return (
    <div>
      <h1>{categoryName}</h1>
      {filteredProducts.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
}
