import React, { useState, useEffect } from 'react'
import {
  getCart,
  addItemToCart,
  removeItemFromCart
} from '../services/cartServices'
import { getProducts } from '../services/productServices'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState(null)
  const [products, setProducts] = useState([])
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

    const fetchProducts = async () => {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
      } catch (error) {
        setError('Failed to fetch products.')
      }
    }

    fetchCart()
    fetchProducts()
  }, [])

  const handleAddItem = async (productId, quantity) => {
    try {
      const updatedCart = await addItemToCart(productId, quantity)
      setCart(updatedCart)
    } catch (error) {
      setError('Failed to add item to cart.')
    }
  }

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeItemFromCart(productId)
      setCart(updatedCart)
    } catch (error) {
      setError('Failed to remove item from cart.')
    }
  }

  //   const handleQuantityChange = async (productId, quantity) => {
  //     if (quantity <= 0) return;
  //     try {
  //       const updatedCart = await addItemToCart(productId, quantity);
  //       setCart(updatedCart);
  //     } catch (error) {
  //       setError('Failed to update quantity.');
  //     }
  //   };

  const handlePlaceOrder = () => {
    if (cart && cart.items.length > 0) {
      navigate('/orders/place');
    } else {
      setError('Your cart is empty. Please add items to your cart before placing an order.');
    }
  };

  if (!cart) return <p>Loading...</p>

  return (
    <div className='cart'>
      <h2>Cart</h2>
      {error && <p>{error}</p>}
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId._id}>
            <img src={item.productId.image} alt={item.productId.name} />
            <p>Product: {item.productId.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: ${item.quantity * item.productId.price}</p>
            <button onClick={() => handleRemoveItem(item.productId._id)}>
              Remove
            </button>
            {/* <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
            /> */}
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  )
}

export default Cart
