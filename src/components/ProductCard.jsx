import React, { useState } from 'react'

const ProductCard = ({ name, price, quantity, unit, image, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart() // Call the handler passed from Home
    setIsAdded(true)

    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={name} />
      <h3>{name}</h3>
      <p>Quantity: {quantity} {unit}</p>
      <p>Price: ${price}</p>

      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>

      {isAdded && <p className="added-message">Added to cart!</p>}
    </div>
  )
}

export default ProductCard
