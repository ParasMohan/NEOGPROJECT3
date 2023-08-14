import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Link the CSS file

const Login = () => {
  const { signIn, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;

    try {
      await signIn(email, password);
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.', { position: 'top-center' });
    }
  };

  const handleGuestLogin = async () => {
    const guestEmail = 'adarshbalika@gmail.com';
    const guestPassword = 'adarshbalika';

    try {
      await signIn(guestEmail, guestPassword);
      toast.success('Logged in as a guest!');
    } catch (error) {
      console.error('Guest login error:', error);
      toast.error('Guest login failed. Please try again.', { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (token === true) {
      navigate('/');
    }
  }, [token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <label>
            Email
            <input type="text" required />
          </label>
          <label className="label-container">
            Password
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`password-toggle ${showPassword ? 'visible' : ''}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🙈' : '👁️'}
              </i>
            </div>
          </label>
          <div className="button-container">
            <button type="submit">Sign In</button>
            <button type="button" onClick={handleGuestLogin}>Guest Login</button>
          </div>
        </form>
        <div className="signup-text">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
