import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "..";

export default function Header() {
  const { isLoggedIn, signOut } = useContext(AuthContext);

  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      <h1>TechKart</h1>
      <nav>
        <Link to="/">Home</Link> ||
        <Link to="/category">Category</Link> ||
        <Link to="/cart">Cart</Link> ||
        <Link to="/checkout">Checkout</Link> ||
        <Link to="/wishlist">Wishlist</Link> ||
        {isLoggedIn ? (
          <React.Fragment>
            <Link to="/userprofile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </React.Fragment>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
}
