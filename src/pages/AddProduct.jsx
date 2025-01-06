import React, { useState, useEffect } from 'react'
import { createProduct } from '../services/productServices'
import { useNavigate } from 'react-router-dom'
import { getRole } from '../services/authServices'

const AddProduct = () => {
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
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createProduct(formData)
      navigate('/products')
    } catch (error) {
      setError('Failed to add product.')
    }
  }

  if (role !== 'admin') {
    return <p>Access denied. Only admins can add products.</p>
  }

  return (
    <div className='add-product'>
      <h2>Add Product</h2>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
