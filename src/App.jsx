import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import ProductDetails from './pages/ProductDetails'
import OrderDetails from './pages/OrderDetails'
import Cart from './pages/Cart'
import ProductCard from './components/ProductCard'
import fakeDatabase from './db/Products'
import LoginForm from './components/Login'
import SignUpForm from './components/AuthForm'
import React, { useState } from 'react'

const App = () => {
  const [cart, setCart] = useState([]) // Move cart state here
  const [orders, setOrders] = useState([]) // Array of orders

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item.id === product.id)

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity) + Number(quantity) }
            : item
        )
      )
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: quantity }])
    }
  }
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home products={fakeDatabase} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} setCart={setCart} setOrders={setOrders} />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/products"
            element={<ProductCard products={fakeDatabase} />}
          />
          <Route
            path="/product/:productId"
            element={
              <ProductDetails products={fakeDatabase} addToCart={addToCart} />
            }
          />
          <Route path="/orders" element={<OrderDetails orders={orders} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
