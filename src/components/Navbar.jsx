import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('currentUser');
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      
      <div className="navbar-logo">
        <Link to="/">BlueIsh</Link>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        {isAuthenticated && <li><Link to="/shop">Shop</Link></li>}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
      </ul>

      <div className="navbar-actions">
        <Link to="/shop" className="cart-icon">🛒</Link>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path d="M2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z"/>
              </svg>
            </span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
      
    </nav>
  );
}