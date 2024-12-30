
import { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import ProductDetails from './pages/ProductDetails'
import ViewProduct from './pages/ViewProduct' 
import OrderDetails from './pages/OrderDetails'
import Cart from './pages/Cart'
import LoginForm from './components/Login'
import SignUpForm from './components/AuthForm';



const App = () => {
  

  return (
    <div>
            <Header />
            <main>
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<SignUpForm />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:gameId" element={<ProductDetails />} />
                <Route path="/view/products/:genreId" element={<ViewProduct />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/carts/:cartId" element={<Cart />} />
              </Routes>
            </main>

    </div>

  )
}

export default App

