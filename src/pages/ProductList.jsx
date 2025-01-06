import React, { useState, useEffect } from 'react'
import { getProducts, deleteProduct } from '../services/productServices'
import { addItemToCart } from '../services/cartServices'
import { Link, useNavigate } from 'react-router-dom'
import { getRole } from '../services/authServices'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState({})
  const [role, setRole] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userRole = getRole()
    setRole(userRole)

    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        setProducts(response)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addItemToCart(productId, quantity)
      alert('Product added to cart!')
    } catch (error) {
      console.error('Failed to add product to cart:', error)
    }
  }

  const handleQuantityChange = (productId, value, maxQuantity) => {
    const qty = Math.min(value, maxQuantity)
    setQuantity((prev) => ({ ...prev, [productId]: qty }))
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      setProducts(products.filter((product) => product._id !== id))
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  return (
    <div className='Product'>
      <h2>Product List</h2>
      <ul id='list'>
        {products.map((product) => (
          <li key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              {product.quantity} {product.unit}
            </p>
            <p>${product.price}</p>
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={quantity[product._id] || 1}
              onChange={(e) =>
                handleQuantityChange(
                  product._id,
                  parseInt(e.target.value),
                  product.quantity
                )
              }
            />
            <button
              onClick={() =>
                handleAddToCart(product._id, quantity[product._id] || 1)
              }
            >
              Add to Cart
            </button>
            {role === 'admin' && (
              <div>
                <Link to={`/products/update/${product._id}`}>Edit</Link>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {role === 'admin' && (
        <button onClick={() => navigate('/products/add')}>Add Product</button>
      )}
    </div>
  )
}

export default ProductList
