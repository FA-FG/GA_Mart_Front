import Client from './api'

//Profile
export const getProfile = async () => {
  const response = await Client.get('/auth/profile')
  return response.data
}

export const updateProfile = async (profileData) => {
  const response = await Client.put('/auth/profile', profileData)
  return response.data
}
