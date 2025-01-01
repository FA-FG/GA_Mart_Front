import React from 'react'

const OrderDetails = ({ orders = [] }) => {
  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order">
              <h3>Order {index + 1}</h3>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <p>{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>
              <p>Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  )
}

export default OrderDetails
