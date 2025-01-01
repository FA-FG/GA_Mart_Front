import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams()
  const product = products.find((p) => p.id === parseInt(productId))

  if (!product) {
    return <p>Product not found</p>
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="product-details-container">
      <div className="product-card">
        <h2 className="product-title">Product Details</h2>

        <div className="product-image-containerr">
          <img
            className="product-image-details"
            src={product.image}
            alt={`Image of ${product.name}`}
          />
        </div>

        <div className="product-infoo">
          <h3 className="product-namee">{product.name}</h3>
          <p className="product-quantityy">
            Quantity: {product.quantity} {product.unit}
          </p>
          <p className="product-pricee">Price: ${product.price}</p>
          <p className="product-descriptionn">
            Description: {product.description}
          </p>
        </div>

        <div className="product-action">
          <button className="add-to-cart-buttonn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
