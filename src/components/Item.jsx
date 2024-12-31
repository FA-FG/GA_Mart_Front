// src/components/CartItem.js
import React from 'react';
import '../App.css';

const CartItem = ({ product }) => {
  if (!product) return null;

  return (
    <div className="cart-item">
      <img className="cart-item-img" src={product.image || 'default-image.jpg'} alt={product.name} />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{product.name || 'Product Name'}</h3>
        <p className="cart-item-price">{product.price || '$0.00'}</p>
        <input 
          type="number" 
          className="cart-item-quantity" 
          value={product.quantity || 1} 
          min="1" 
        />
        <button className="remove-btn">Remove</button>
      </div>
    // </div>
  );
};

export default CartItem;
