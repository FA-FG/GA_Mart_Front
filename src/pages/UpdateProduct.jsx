import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, updateProduct } from '../services/productServices'
import { getRole } from '../services/authServices'

const UpdateProduct = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    price: '',
    image: '',
    description: ''
  })
  const [error, setError] = useState('')
  const [role, setRole] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userRole = getRole()
    setRole(userRole)

    const fetchProduct = async () => {
      try {
        const product = await getProductById(id)
        setFormData({
          name: product.name,
          quantity: product.quantity,
          unit: product.unit,
          price: product.price,
          image: product.image,
          description: product.description
        })
      } catch (error) {
        setError('Failed to load product data.')
      }
    }
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProduct(id, formData)
      navigate('/products')
    } catch (error) {
      setError('Failed to update product.')
    }
  }

  if (role !== 'admin') {
    return <p>Access denied. Only admins can update products.</p>
  }

  return (
    <div className='update-product'>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Unit:</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Update Product</button>
      </form>
    </div>
  )
}

export default UpdateProduct
