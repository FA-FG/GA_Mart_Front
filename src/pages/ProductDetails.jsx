import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = ({ products, addToCart, user }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="error-message">
        <p>Sorry, this product is not available.</p>
        <Link to="/" className="back-to-home">Go back to Home</Link>
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1); // Track quantity for adding to cart

  // Function to handle Add to Cart
  const handleAddToCart = () => {
    if (quantity < 1 || isNaN(quantity)) {
      alert("Please select a valid quantity.");
      return;
    }
    addToCart({ ...product, quantity: parseInt(quantity, 10) });
  };

  return user ? (
    <div className="product-details-container">
      <div className="product-card">
        <h2 className="product-title">Product Details</h2>

        <div className="product-image-container">
          <img
            className="product-image-details"
            src={product.image}
            alt={`Image of ${product.name}`}
            aria-describedby="product-description"
          />
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-quantity">
            Available Quantity: {product.quantity} {product.unit}
          </p>
          <p className="product-price">Price: ${product.price}</p>
          <p id="product-description" className="product-description">
            Description: {product.description}
          </p>
        </div>

        <div className="quantity-selector">
          <label htmlFor="quantity" className="quantity-label">Select Quantity: </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            aria-label="Select product quantity"
          />
        </div>

        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>

        <Link to="/cart">
          <button className="checkout-button">Go to Cart</button>
        </Link>
      </div>
    </div>
  ):<div className="protected">
  <h3>Oops! You must be signed in to do that!</h3>
  <button onClick={() => navigate('/signin')}>Sign In</button>
</div>
}

export default ProductDetails;
