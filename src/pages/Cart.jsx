// src/pages/CartPage.js
import React from 'react';
import CartItem from '../components/Item';
import CartSummary from '../components/Sumup';
import '../App.css';

const CartPage = () => {
  // Placeholder for products (empty for now)
  const products = [];

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {products.length === 0 ? (
            <p>Your cart is empty</p>
          ) :  
          (
            products.map((product) => (
              <CartItem key={product.id} product={product} />
            )
          )
          )
          }
        </div>

        <div className="cart-summary">
          <CartSummary />
        </div>
      </div>
     </div>
  );
};

export default CartPage;
