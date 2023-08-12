import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../backend/db/categories";
import { products } from "../backend/db/products";
import "./Category.css"; // Import the CSS file for styling

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory.name)
    : products;

  return (
    <div className="category-container">
      <h1>Category</h1>
      <div className="category-links">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.name}`}
            className="category-link"
            onClick={() => handleCategoryClick(category)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <h3 className="category-title">{category.name}</h3>
            <p className="category-description">{category.description}</p>
          </Link>
        ))}
      </div>
      {selectedCategory && (
        <div className="product-list">
          <h2>{selectedCategory.name} Products</h2>
          <div>
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-item">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
