import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "..";
import "./Header.css"; // Import your CSS file for styling

export default function Header() {
  const { token, signOut } = useContext(AuthContext);

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="header">
      <h1 className="logo">TechKart</h1>
      <nav className="nav">
        <NavLink exact to="/" activeClassName="active" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/category" activeClassName="active" className="nav-link">
          Category
        </NavLink>
        <NavLink to="/cart" activeClassName="active" className="nav-link">
          Cart
        </NavLink>
        <NavLink to="/checkout" activeClassName="active" className="nav-link">
          Checkout
        </NavLink>
        <NavLink to="/wishlist" activeClassName="active" className="nav-link">
          Wishlist
        </NavLink>
        {token ? (
          <React.Fragment>
            <NavLink
              to="/userprofile"
              activeClassName="active"
              className="nav-link"
            >
              Profile
            </NavLink>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </React.Fragment>
        ) : (
          <NavLink to="/login" activeClassName="active" className="nav-link">
            Login
          </NavLink>
        )}
      </nav>
    </div>
  );
}
