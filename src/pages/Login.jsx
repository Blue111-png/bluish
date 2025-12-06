import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

export default function Login({setIsAuthenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
const userFound = storedUsers.find(
  (user) => user.email === email && user.password === password
);

if (userFound) {
  localStorage.setItem('currentUser', JSON.stringify(userFound));
  setIsAuthenticated(true);
  navigate('/profile');
} else {
  setError('Invalid credentials');
}

  };

  return (
    <div className="login-container">
      <h2>Login to Bluish</h2>
      <form onSubmit={handleSubmit}>
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

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}