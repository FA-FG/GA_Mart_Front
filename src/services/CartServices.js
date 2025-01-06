import Client from './api'

//Get or create a cart
export const getCart = async () => {
  const response = await Client.get('/cart')
  console.log('Fetched Cart:', response.data)
  return response.data
}

//Add an item to the cart
export const addItemToCart = async (productId, quantity) => {
  const response = await Client.post('/cart/add', { productId, quantity })
  return response.data
}

//Remove an item from the cart
export const removeItemFromCart = async (productId) => {
  const response = await Client.post('/cart/remove', { productId })
  return response.data
}
