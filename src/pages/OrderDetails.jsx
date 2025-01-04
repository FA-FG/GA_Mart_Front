import React from 'react';
import { useNavigate } from 'react-router-dom'

const OrderDetails = ({ orders = [] ,user}) => {
  return user ? (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={order.id || index} className="order-item">
              <div className="order-info">
                <h3>Order #{order.id || index + 1}</h3>
                <p>Date: {new Date(order.date).toLocaleString()}</p>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-details">
                    <p>{item.name}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <p>Total: ${order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your orders list is empty.</p>
      )}
      {/* Optional: Button to navigate to homepage or shop */}
      <button onClick={() => window.location.href = "/"} className="go-shopping-button">
        Continue Shopping
      </button>
    </div>
  ):<div className="protected">
  <h3>Oops! You must be signed in to do that!</h3>
  <button onClick={() => navigate('/signin')}>Sign In</button>
</div>
}

export default OrderDetails;
