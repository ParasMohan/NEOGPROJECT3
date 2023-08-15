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
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import { RequiresAuth } from "./components/RequiresAuth";
import UserProfile from "./pages/UserProfile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation"; // Add this import
import WishList from "./pages/WishList";
import Home from "./pages/Home";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList products={products} />} />
        <Route path="/cart" element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          } />

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
        <Route path="/signup" element={<Signup />} />

        <Route path="/userprofile" element={
           <RequiresAuth>
             <UserProfile />
           </RequiresAuth>
        } />

        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <WishList />
            </RequiresAuth>
          }
        />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer/>
    </div>
  );
}
