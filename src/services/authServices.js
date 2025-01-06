import Client from './api'
import { jwtDecode } from 'jwt-decode'

export const login = async (email, password) => {
  const response = await Client.post('/auth/login', { email, password })
  localStorage.setItem('token', `Bearer ${response.data.token}`)
  localStorage.setItem('role', response.data.role)
  return response.data
}

export const register = async (username, email, password) => {
  const response = await Client.post('/auth/register', {
    username,
    email,
    password
  })
  return response.data
}

export const signOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
}

export const isLoggedIn = () => {
  const token = localStorage.getItem('token')
  if (!token) return false
  return true
}

export const getRole = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  const decodedToken = jwtDecode(token)
  return decodedToken.role
}
