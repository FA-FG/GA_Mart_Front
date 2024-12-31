import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import fakeDatabase from '../db/Products' // Assuming this is where your products are stored

const Home = ({ products = [] }) => {
  const [searchQuery, setSearchQuery] = useState('') // State for search query

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          Search
        </button>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              quantity={product.quantity}
              unit={product.unit}
              price={product.price}
              image={product.image}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  )
}

export default Home
