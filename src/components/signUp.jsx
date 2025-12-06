import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'

export default function Signup({setIsAuthenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [name, setName]=useState('')
  const [cart, setCart]=useState([])
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirm.trim()) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
   const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

const newUser = {
  name,
  email,
  password,
  cart
};

// Check if email already exists
const emailExists = storedUsers.some(user => user.email === email);
if (emailExists) {
  setError('Email already registered.');
  return;
}

// Add new user and save
storedUsers.push(newUser);
localStorage.setItem('users', JSON.stringify(storedUsers));

    // Simulate account creation
    console.log('Account created:', email);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
setIsAuthenticated(true); // If you're using this state in App.js
navigate('/profile'); // Redirect straight to profile
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' type='text' value={name} onChange={(e)=> setName(e.target.value)} required/>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Sign Up</button>
      </form>

      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}