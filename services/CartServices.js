import Client from './api' // Adjust the path based on your file structure

// Create a new cart
const createCart = async (cartData) => {
  try {
    const response = await Client.post('/cart/create', cartData)
    return response.data
  } catch (error) {
    console.error('Error creating cart:', error)
    throw error
  }
}

// Get cart by ID
const getCart = async (id) => {
  try {
    const response = await Client.get(`/cart/${id}`)
    return response.data
  } catch (error) {
    console.error('Error getting cart:', error)
    throw error
  }
}

// Add product to cart by ID
const addProductToCart = async (cartId, productId) => {
  try {
    const response = await Client.put(`/cart/addProduct/${cartId}`, {
      productId
    })
    return response.data
  } catch (error) {
    console.error('Error adding product to cart:', error)
    throw error
  }
}

// Remove product from cart by ID
const removeProductFromCart = async (cartId, productId) => {
  try {
    const response = await Client.put(`/cart/removeProduct/${cartId}`, {
      productId
    })
    return response.data
  } catch (error) {
    console.error('Error removing product from cart:', error)
    throw error
  }
}

export default {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart
}
