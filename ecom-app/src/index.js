import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { CartContext, CartProvider } from "./context/CartContext";
import { WishlistContext, WishlistProvider } from "./context/WishlistContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import UserContextProvider, { UserContext } from "./context/UserContext";
import { makeServer } from "./server";
import { DataProvider } from "./context/DataContext";
import { FooterProvider } from "./context/FooterContext"; // Import the FooterProvider

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

export { CartContext };
export { WishlistContext };
export { AuthContext };
export { UserContext };

makeServer();
root.render(
  <StrictMode>
    <Router>
      <WishlistProvider>
        <CartProvider>
          <AuthProvider>
            <UserContextProvider>
              <DataProvider>
                <FooterProvider> 
                  <App />
                </FooterProvider>
              </DataProvider>
            </UserContextProvider>
          </AuthProvider>
        </CartProvider>
      </WishlistProvider>
    </Router>
  </StrictMode>
);
