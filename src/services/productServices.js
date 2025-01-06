import Client from './api'

//Create a new product
export const createProduct = async (productData) => {
  const response = await Client.post('/products/add', productData)
  return response.data
}

//Get all products
export const getProducts = async () => {
  const response = await Client.get('/products')
  return response.data
}

//Get a single product by ID
export const getProductById = async (id) => {
  const response = await Client.get(`/products/${id}`)
  return response.data
}

//Update a product
export const updateProduct = async (id, productData) => {
  const response = await Client.put(`/products/${id}`, productData)
  return response.data
}

//Delete a product
export const deleteProduct = async (id) => {
  const response = await Client.delete(`/products/${id}`)
  return response.data
}
