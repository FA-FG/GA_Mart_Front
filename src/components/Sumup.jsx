// src/components/CartSummary.js
import React from 'react';
import '../App.css';

const CartSummary = () => {

  const subtotal = 0.00;

  const total = subtotal ;

  return (
    <div className="cart-summary-container">
      <h2>Summary</h2>
      <div className="summary-item">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
     
      <div className="summary-item summary-total">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-btn">View Order</button>
    </div>
  );
};

export default CartSummary;
