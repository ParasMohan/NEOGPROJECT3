import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"; // Link the CSS file

const Signup = () => {
  const { signUp, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-center" });
      return;
    }

    toast.success("Signed Up Successfully!", { position: "top-center" });

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      await signUp(userData);
      // Redirect to user profile page after successful signup
      navigate("/userprofile");
    } catch (error) {
      console.log("Can't sign up", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`password-toggle ${showPassword ? "visible" : ""}`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙈" : "👁️"}
            </i>
          </div>
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="button-container">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      {token && (
        <div>
          <h2>Sign up successful!</h2>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
