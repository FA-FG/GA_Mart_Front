// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom'

const Home = ({ addToCart,user }) => {
  const [products, setProducts] = useState([]); // Ensure initial state is an empty array
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState({});

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        console.log('API Response:', response.data); // Log the response data
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Set the products in state if it's an array
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []); // Empty dependency array means this runs once when the component mounts

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateQuantity = (productName, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: quantity,
    }));
  };

  return user ? (
    <div className="home-container">
      <h2>Product List</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => setSearchQuery('')}
          className="clear-button"
        >
          Clear
        </button>
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-item">
              <Link
                to={`/product/${product.id}`}
                className="product-image-link"
              >
                <ProductCard
                  _id={product._id}
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
                onClick={() =>
                  addToCart(product, quantities[product.name] || 1)
                }
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
  ):<div className="protected">
  <h3>Oops! You must be signed in to do that!</h3>
  <button onClick={() => navigate('/signin')}>Sign In</button>
</div>
};

export default Home;