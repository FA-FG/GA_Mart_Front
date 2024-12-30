import React from 'react'

const ProductCard = ({ name, quantity, unit, price, image }) => {
  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={name} />
      <h3>{name}</h3>
      <p>
        Quantity: {quantity} {unit}
      </p>
      <p>Price: ${price}</p>
    </div>
  )
}

export default ProductCard
