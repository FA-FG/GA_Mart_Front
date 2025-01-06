import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProfileView from './pages/ProfileView'
import ProfileUpdate from './pages/ProfileUpdate'
import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import OrderHistory from './pages/OrderHistory'
import AllOrders from './pages/AllOrders'
import About from './pages/About'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/profile/update" element={<ProfileUpdate />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders/place" element={<PlaceOrder />} />
      <Route path="/orders/history" element={<OrderHistory />} />
      <Route path="/orders/all" element={<AllOrders />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/update/:id" element={<UpdateProduct />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default AppRoutes
