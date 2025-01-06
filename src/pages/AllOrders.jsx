import React, { useState, useEffect } from 'react'
import { getAllOrders } from '../services/orderServices'

const AllOrders = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getAllOrders()
        setOrders(Array.isArray(ordersData) ? ordersData : [])
      } catch (error) {
        setError('Failed to fetch orders.')
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className='all-orders'>
      <h2>All Orders</h2>
      {error && <p>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Order Date: {new Date(order.date).toLocaleString()}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>User: {order.userId.username}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.productId}>
                  <p>Product: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllOrders
