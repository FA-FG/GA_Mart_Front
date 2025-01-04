import Client from './api' // Adjust the path based on your file structure

// Create a new product
const createProduct = async (productData) => {
  try {
    const response = await Client.post('/create', productData) // Updated path
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}
const getProducts = async () => {
  try {
    const response = await Client.get(`/products`) // Updated path
    return response.data
  } catch (error) {
    console.error('Error getting product:', error)
    throw error
  }
}
// Get product by ID
const getProduct = async (id) => {
  try {
    const response = await Client.get(`/products/${id}`) // Updated path
    return response.data
  } catch (error) {
    console.error('Error getting product:', error)
    throw error
  }
}

// Update a product by ID
const updateProduct = async (id, updatedData) => {
  try {
    const response = await Client.put(`/products/${id}`, updatedData) // Updated path
    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

// Delete a product by ID
const deleteProduct = async (id) => {
  try {
    const response = await Client.delete(`/products/${id}`) // Updated path
    return response.data
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

export default {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProducts
}
