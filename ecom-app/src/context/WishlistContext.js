import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      wishlist.push(product);
    }

    setWishlist([...wishlist]);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const removeItem = (item) => {
    const updatedWishlist = wishlist.filter(
      (wishlistItem) => wishlistItem._id !== item._id
    );
    setWishlist(updatedWishlist);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeItem,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
