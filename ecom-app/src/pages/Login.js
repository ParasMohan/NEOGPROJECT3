import React, { useContext, useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, isLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();

  console.log(isLoggedIn, "from sign in");
  
  //   if (loggedIn !== false) {
  //     navigate("/signin");
  //   }

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    try {
      await signIn(email, password);
    } catch (error) {
      console.log("cant long in", error);
    }
  };

  
useEffect(()=>{if (isLoggedIn === true) {
    navigate("/");
  }},[isLoggedIn])

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <label>
          Email
          <input type="text" required></input>
        </label>
        <label>
          Password
          <input type="password" required></input>
        </label>
        <button type="submit">Sign In</button>
      </form>
      
    </div>
  );
};

export default Login;