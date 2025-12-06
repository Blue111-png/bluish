import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const location = useLocation();
  const { cart = [], currentUser } = location.state || {};

  return (
    <div className="checkout-page">
      <h1>🧾 Finalize Your Order</h1>
      <div>
        {cart.map((item) => (
          <div key={item.id} className="product-cardcheck">
            <img src={item.url} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
        <h2> Total: $
  {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
</h2>
      </div>
      <CheckoutForm
        cart={cart}
        currentUser={currentUser}
      />
    </div>
  );
};

export default CheckoutPage;