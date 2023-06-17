import "./styles.css";
import React from "react";
import { categories } from "./backend/db/categories";
import { products } from "./backend/db/products";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Category from "./pages/Category";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import { RequiresAuth } from "./components/RequiresAuth";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/category"
          element={<Category categories={categories} />}
        />
        <Route
          path="/category/:categoryName"
          element={<CategoryPage products={products} />}
        />
        <Route path="/product/:productId" element={<ProductDetail />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <WishList />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}
