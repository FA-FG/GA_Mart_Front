import Client from './api' // Adjust the path based on your file structure

// Register a new user
const registerUser = async (userData) => {
  try {
    const response = await Client.post('/user/register', userData)
    return response.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

// Login a user
const loginUser = async (credentials) => {
  try {
    const response = await Client.post('/user/login', credentials)
    return response.data // Assuming token or user data is returned
  } catch (error) {
    console.error('Error logging in user:', error)
    throw error
  }
}

// Create a new user (admin functionality)
const createUser = async (userData) => {
  try {
    const response = await Client.post('/user/create', userData)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Get a user by ID
const getUser = async (id) => {
  try {
    const response = await Client.get(`/user/${id}`)
    return response.data
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

// Update a user by ID
const updateUser = async (id, updatedData) => {
  try {
    const response = await Client.put(`/user/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Delete a user by ID
const deleteUser = async (id) => {
  try {
    const response = await Client.delete(`/user/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export default {
  registerUser,
  loginUser,
  createUser,
  getUser,
  updateUser,
  deleteUser
}
