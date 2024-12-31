import Client from './api'

export const getCart = async (userId) => {
  try {
    const response = await Client.get(`/cart/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const addProductToCart = async (userId, productId) => {
  try {
    const response = await Client.post(`/cart/${userId}/add`, { productId })
    return response.data
  } catch (error) {
    throw error
  }
}
