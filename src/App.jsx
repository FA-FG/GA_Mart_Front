import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import ProductDetails from './pages/ProductDetails'
import OrderDetails from './pages/OrderDetails'
import Cart from './pages/Cart'
import ProductCard from './components/ProductCard'
import fakeDatabase from './db/Products'
import SignUpForm from './components/AuthForm'
import React from 'react'
import Leed from './pages/Leed'
import SignIn from './pages/SignIn'
import AddProductForm from './components/AddProductForm'

import { CheckSession } from './services/Auth'

// const App = () => {
//   const [cart, setCart] = useState([]) // Move cart state here
//   const [orders, setOrders] = useState([]) // Array of orders

//   const addToCart = (product, quantity) => {
//     const existingProduct = cart.find((item) => item.id === product.id)

//     if (existingProduct) {
//       setCart((prevCart) =>
//         prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: Number(item.quantity) + Number(quantity) }
//             : item
//         )
//       )
//     } else {
//       setCart((prevCart) => [...prevCart, { ...product, quantity: quantity }])
//     }
//   }
//   return (
//     <div>
//       <Header />
//       <main>
//         <Routes>
//           <Route
//             path="/"
//             element={<Home products={fakeDatabase} addToCart={addToCart} />}
//           />
//          <Route
//   path="/cart"
//   element={    <Cart cart={cart} setCart={setCart} />
//   } />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/register" element={<SignUpForm />} />
//           <Route path="/about" element={<About />} />
//           <Route
//             path="/products"
//             element={<ProductCard products={fakeDatabase} />}
//           />
//           <Route
//             path="/product/:productId"
//             element={
//               <ProductDetails products={fakeDatabase} addToCart={addToCart} />
//             }
//           />
//           <Route path="/add-product" element={<AddProductForm />}/>
//           <Route path="/orders" element={<OrderDetails orders={orders} />} />
//         </Routes>
//       </main>
//     </div>
//   )
// }

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear() 
  }

  const checkToken = async () =>{
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      checkToken()
    }
  },[])

   return (
    <div>
      <Header 
        user={user}
        handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Leed />}/>
          <Route path="/signin" element={<SignIn  setUser={setUser}/>} />
          <Route path="/main" element={<Home user={user}/>}/>
          <Route path="/cart" element={<Cart user={user}/>} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/about" element={<About user={user}/>} />
          <Route path="/products" element={<ProductCard user={user}/>}/>
          <Route path="/product/:productId" element={<ProductDetails user={user} />}/>
          <Route path="/add-product" element={<AddProductForm />}/>
          <Route path="/orders" element={<OrderDetails user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App