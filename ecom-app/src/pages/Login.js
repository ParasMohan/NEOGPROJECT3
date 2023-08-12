import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { signIn, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    try {
      await signIn(email, password);
      toast.success('Logged in successfully!', { position: 'top-center' });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.', { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <label>
          Email
          <input type="text" required />
        </label>
        <label>
          Password
          <input type="password" required />
        </label>
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Login;
