import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      setCart([...cart, product]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
    setCart(updatedCart);
  };

  const increaseQuantity = (item) => {
    const updatedCart = [...cart];
    const selectedItem = updatedCart.find(
      (cartItem) => cartItem._id === item._id
    );
    selectedItem.quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = (item) => {
    const updatedCart = [...cart];
    const selectedItem = updatedCart.find(
      (cartItem) => cartItem._id === item._id
    );
    selectedItem.quantity -= 1;
    if (selectedItem.quantity === 0) {
      removeItem(selectedItem);
    } else {
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
