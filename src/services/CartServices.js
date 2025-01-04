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


const getCart = async () => {
  try {
    const response = await Client.get(`/get`)
    return response.data
  } catch (error) {
    console.error('Error getting cart:', error)
    throw error
  }
}



// Add product to cart by ID
const addProductToCart = async (cartId, productId) => {
  try {
    const response = await Client.post(`/add`, {
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
    const response = await Client.put(`/remove`, {
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
