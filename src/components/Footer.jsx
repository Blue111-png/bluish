import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
       

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul className='footer-list'>
            <li><Link to="/shop">Shop</Link></li>
            
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul className='footer-list'>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TrendyCart. All rights reserved.</p>
      </div>
    </footer>
  );
}