import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = ({ cart = [], setCart, orders, setOrders }) => {
  const navigate = useNavigate()

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return // Prevent setting quantity below 1
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: parseInt(quantity, 10) }
          : item
      )
    )
  }

  // Calculate total price of all items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Handle checkout
  const handleCheckout = () => {
    const newOrder = {
      id: Date.now(), // Generate a unique order ID
      date: new Date(),
      items: cart,
      total: calculateTotal()
    }
    setOrders((prevOrders) => [...prevOrders, newOrder]) // Add the new order
    setCart([]) // Clear the cart
    navigate('/orders') // Navigate to the Orders page
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${calculateTotal().toFixed(2)}</p>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  )
}

export default Cart
