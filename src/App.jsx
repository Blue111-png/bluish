
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './components/signUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/profile';
import { useState} from 'react'
import ProtectedRoute from './components/ProtectedRoute';
import Shop from './pages/shop';
import About from './pages/About';
import CheckoutPage from './pages/CheckoutPage';
import Contact from './pages/contact';


function App() {
const [isAuthenticated, setIsAuthenticated] = useState(() => {
  const user = localStorage.getItem('currentUser');
  
  return !!user;
});

    return (
        <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
            <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='/signup' element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route
  path='/profile'
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route path='/shop'element={  
  <ProtectedRoute isAuthenticated={isAuthenticated}>
  <Shop /> 
  </ProtectedRoute>} />
          <Route path='/About' element={<About/>} />
          <Route path='/Contact' element={<Contact/>} />
          <Route path='/CheckoutPage' element={<CheckoutPage/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
