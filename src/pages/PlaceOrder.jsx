import React, { useState, useEffect } from 'react'
import { createOrder } from '../services/orderServices'
import { getCart } from '../services/cartServices'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const [cart, setCart] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart()
        setCart(cartData)
      } catch (error) {
        setError('Failed to fetch cart.')
      }
    }

    fetchCart()
  }, [])

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        cartId: cart._id,
        totalPrice: cart.items.reduce(
          (acc, item) => acc + item.quantity * item.productId.price,
          0
        ),
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity
        }))
      }
      await createOrder(orderData)
      alert('Order placed successfully!')
      navigate('/cart')
    } catch (error) {
      setError('Failed to place order.')
    }
  }

  if (!cart) return <p>Loading...</p>

  return (
    <div className='place-order'>
      <h2>Please Confirm your Order!</h2>
      {error && <p>{error}</p>}
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId._id}>
            <img src={item.productId.image} alt={item.productId.name} />
            <p>Product: {item.productId.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: ${item.quantity * item.productId.price}</p>
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  )
}

export default PlaceOrder
