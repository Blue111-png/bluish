import React, { useState } from 'react';
import './CheckoutForm.css'; // Optional: style separately
import { Link } from 'react-router-dom';

const CheckoutForm = ({ cart, currentUser }) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 const [order,setOrder]=useState({})

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !address.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    // Simulate checkout logic
    const orders = {
      user: { name, email },
      address,
      paymentMethod,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
    };
     
     setOrder(orders)
    

    console.log('Order submitted:', order);
    setSuccess('Checkout successful! Thank you for your purchase.');
    setError('');

      // Clear form fields
  setName('');
  setEmail('');
  setAddress('');
  setPaymentMethod('Credit Card');

  };
   // Wherever you're navigating from (e.g., after checkout)
localStorage.setItem('latestOrder', JSON.stringify(order));


  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Momo</option>
            <option>Cash on Delivery</option>
          </select>
        </label>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Place Order</button>
      </form>
      <Link to='/profile' state={{order}}>See Profile for notification</Link>
    </div>
  );
};

export default CheckoutForm;