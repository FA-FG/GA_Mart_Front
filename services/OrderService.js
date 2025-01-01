import Client from './api' // Adjust the path based on your file structure

// Create a new order
const createOrder = async (orderData) => {
  try {
    const response = await Client.post('/order/create', orderData)
    return response.data
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

// Get order by ID
const getOrder = async (id) => {
  try {
    const response = await Client.get(`/order/${id}`)
    return response.data
  } catch (error) {
    console.error('Error getting order:', error)
    throw error
  }
}

// Update an order by ID
const updateOrder = async (id, updatedData) => {
  try {
    const response = await Client.put(`/order/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}

// Delete an order by ID
const deleteOrder = async (id) => {
  try {
    const response = await Client.delete(`/order/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting order:', error)
    throw error
  }
}

export default {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder
}
