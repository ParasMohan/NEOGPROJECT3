// Home.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='home-container'>
      <div className='category-head'>
        <h1 className='category-heading'>Shop By Categories</h1>
        <NavLink to="/category/Smartphones" className='category-element'>Smartphones</NavLink>
        <NavLink to="/category/Laptops" className='category-element'>Laptops</NavLink>
        <NavLink to="/category/Accessories" className='category-element'>Accessories</NavLink>
      </div>
      <div className='main-img'>
        <img
          onClick={() => navigate("/products")}
          src='https://assets.justinmind.com/wp-content/webp-express/webp-images/uploads/2019/08/ecommerce-website-design.png.webp'
          alt='hero-image'
        />
      </div>
    </div>
  );
}

export default Home;
