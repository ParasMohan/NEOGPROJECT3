import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { CartContext, CartProvider } from "./context/CartContext";
import { WishlistContext, WishlistProvider } from "./context/WishlistContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

export { CartContext }; // A new syntax. Noticed?
export { WishlistContext };
export { AuthContext };

root.render(
  <StrictMode>
    <Router>
      <WishlistProvider>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </WishlistProvider>
    </Router>
  </StrictMode>
);
