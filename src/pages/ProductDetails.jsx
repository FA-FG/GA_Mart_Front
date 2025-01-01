import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams()
  const product = products.find((p) => p.id === parseInt(productId))

  if (!product) {
    return <p>Product not found</p>
  }

  // Function to handle Add to Cart
  const handleAddToCart = () => {
    const validQuantity = 1 // Ensure valid quantity
    addToCart({ ...product, quantity: validQuantity })
  }

  return (
    <div className="product-details-container">
      <div className="product-card">
        <h2 className="product-title">Product Details</h2>

        <div className="product-image-container">
          <img
            className="product-image-details"
            src={product.image}
            alt={`Image of ${product.name}`}
          />
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-quantity">
            Quantity: {product.quantity} {product.unit}
          </p>
          <p className="product-price">Price: ${product.price}</p>
          <p className="product-description">
            Description: {product.description}
          </p>
        </div>

        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {/* Checkout Button */}
        <Link to="/cart">
          <button className="checkout-button">Go to Cart</button>
        </Link>
      </div>
    </div>
  )
}

export default ProductDetails
