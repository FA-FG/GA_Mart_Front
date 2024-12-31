import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import fakeDatabase from '../db/Products'
import { getCart, addProductToCart } from '../services/cart'
import { getCurrentUser } from '../services/auth' // Ensure this function is available

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  // Fetch user and cart on page load
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const user = await getCurrentUser() // Get the current user
        setUser(user)

        // Check if the user already has a cart
        let cartResponse = await getCart(user.id)
        setCart(cartResponse.productIds)
      } catch (error) {
        console.error('Error fetching user or cart:', error)
      }
    }

    fetchUserCart()
  }, [])

  const handleAddToCart = async (product) => {
    if (!user) {
      console.error('User is not logged in')
      return
    }

    try {
      const response = await addProductToCart(user.id, product._id) // Add product to the cart
      setCart(response.productIds) // Update the cart state after adding the product
    } catch (error) {
      console.error('Error adding product to cart:', error)
    }
  }

  const filteredProducts = fakeDatabase.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="home-container">
      <h2>Product List</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSearchQuery('')} className="clear-button">Clear Search</button>
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              unit={product.unit}
              image={product.image}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Cart Information */}
      <div className="cart-info">
        <h3>Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
