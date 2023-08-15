import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    setCart([...cart]);
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
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}