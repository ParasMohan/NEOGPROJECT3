import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "..";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../index";

export default function Header() {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    navigate(location?.state?.from?.pathname);
  };
  return (
    <div>
      <h1>meKart</h1>
      <h3> items in cart: {cart.length} </h3>
      <nav>
        <NavLink to="/"> home </NavLink> ||
        <NavLink to="/category"> category </NavLink> ||
        <NavLink to="/cart"> cart </NavLink> ||
        <NavLink to="/checkout"> checkout </NavLink> ||
        <NavLink to="/wishlist"> wishlist </NavLink>
        <button onClick={handleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
      </nav>
    </div>
  );
}
