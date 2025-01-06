import Client from './api'

//Create a new order
export const createOrder = async (orderData) => {
  const response = await Client.post('/orders', orderData)
  return response.data
}

//Get all orders (Admin only)
export const getAllOrders = async () => {
  const response = await Client.get('/orders/all')
  return response.data
}

//Get user orders
export const getUserOrders = async () => {
  const response = await Client.get('/orders/user')
  return response.data
}
