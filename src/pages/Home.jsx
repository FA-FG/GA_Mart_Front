import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Import Link for navigation
import ProductCard from '../components/ProductCard'
import ProductDetails from './ProductDetails'

const Home = ({ products = [] }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [quantities, setQuantities] = useState({}) // State for quantities of each product

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Function to update the quantity for a specific product
  const updateQuantity = (productName, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: quantity
    }))
  }

  return (
    <div className="home-container">
      <h2>Product List</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className="search-input"
        />
        {/* Clear Button */}
        <button
          onClick={() => setSearchQuery('')} // Clear search when clicked
          className="clear-button"
        >
          Clear
        </button>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-item">
              {/* Product Card with Link to Product Details */}
              <Link
                to={`/product/${product.id}`}
                className="product-image-link"
              >
                <ProductCard
                  name={product.name}
                  quantity={product.quantity}
                  unit={product.unit}
                  price={product.price}
                  image={product.image}
                />
              </Link>
              <div className="quantity-selector">
                <label htmlFor={`quantity-${index}`}>Quantity: </label>
                <input
                  id={`quantity-${index}`}
                  type="number"
                  min="1"
                  value={quantities[product.name] || 1}
                  onChange={(e) => updateQuantity(product.name, e.target.value)}
                  className="quantity-input"
                />
              </div>
              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-button"
              >
                Add to My Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  )
}

export default Home
