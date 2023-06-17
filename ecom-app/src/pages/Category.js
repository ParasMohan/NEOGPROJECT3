import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../backend/db/categories";
import { products } from "../backend/db/products";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory.name)
    : products;

  return (
    <div>
      <h1>Category</h1>
      <div>
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.name}`}
            style={{
              border: "1px solid gray",
              margin: "0.5rem",
              padding: "0.5rem",
              display: "block",
              textDecoration: "none",
              color: "inherit"
            }}
            onClick={() => handleCategoryClick(category)}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{ width: "100%" }}
            />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>
      {selectedCategory && (
        <div>
          <h2>{selectedCategory.name} Products</h2>
          <div>
            {filteredProducts.map((product) => (
              <div key={product._id}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
