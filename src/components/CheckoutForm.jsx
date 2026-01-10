import React, { useState } from 'react';
import './CheckoutForm.css';
import { Link } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';

const CheckoutForm = ({ cart, currentUser }) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [order, setOrder] = useState({});


  const [state, formspreeSubmit] = useForm("xlggrlkk");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !address.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    const orders = {
      user: { name, email },
      address,
      paymentMethod,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
    };

    setOrder(orders);
    localStorage.setItem('latestOrder', JSON.stringify(orders));

    // Send to Formspree
    await formspreeSubmit(e);

    if (state.succeeded) {
      setSuccess('Checkout successful! Confirmation email sent.');
      setError('');
      setName('');
      setEmail('');
      setAddress('');
      setPaymentMethod('Credit Card');
    } else {
      setError('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>
          Payment Method:
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Momo</option>
            <option>Cash on Delivery</option>
          </select>
        </label>

        {/* Hidden fields to send cart details */}
        <input type="hidden" name="items" value={cart.map(i => `${i.name} x${i.quantity}`).join(', ')} />
        <input type="hidden" name="total" value={cart.reduce((sum, i) => sum + i.price * i.quantity, 0)} />
        <input type="hidden" name="date" value={new Date().toISOString()} />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" disabled={state.submitting}>Place Order</button>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </form>
      <Link to='/profile' state={{order}}>See Profile for notification</Link>
    </div>
  );
};

export default CheckoutForm;