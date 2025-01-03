import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Cart = ({ user,cart = [], setCart, orders, setOrders }) => {
  const [loading, setLoading] = useState(false); // Add loading state for checkout
  const navigate = useNavigate();

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, quantity) => {
    if (isNaN(quantity) || quantity <= 0) return; // Prevent invalid values
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, parseInt(quantity, 10)) }
          : item
      )
    );
  };

  // Calculate total price of all items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle checkout
  const handleCheckout = () => {
    setLoading(true); // Start loading state
    const newOrder = {
      id: Date.now(), // Generate a unique order ID
      date: new Date(),
      items: cart,
      total: calculateTotal(),
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]); // Add the new order
    setCart([]); // Clear the cart
    setTimeout(() => {
      setLoading(false); // End loading state
      navigate('/orders'); // Navigate to the Orders page
    }, 1000); // Simulate a delay for a smooth checkout experience
  };

  return user ? (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <img
                  src={item.image} // Assuming each item has an image property
                  alt={item.name}
                  className="cart-item-image"
                />
                <div>
                  <p>{item.name}</p>
                  <p>Price: ${item.price}</p>
                  <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    aria-label="Quantity input"
                    className="quantity-input"
                  />
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove item from cart"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${calculateTotal().toFixed(2)}</p>
          </div>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  ):<div className="protected">
  <h3>Oops! You must be signed in to do that!</h3>
  <button onClick={() => navigate('/signin')}>Sign In</button>
</div>
}

export default Cart;
