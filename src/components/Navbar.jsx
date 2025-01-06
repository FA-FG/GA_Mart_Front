import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut, isLoggedIn, getRole } from '../services/authServices'

const Navbar = () => {
  const navigate = useNavigate()
  const loggedIn = isLoggedIn()
  const role = getRole()

  const handleSignOut = () => {
    signOut()
    navigate('/login')
  }

  return (
    <nav>
      <ul>
        {!loggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {loggedIn && (
          <>
          <li>
                <Link to="/about">About us</Link>
              </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orders/history">Order History</Link>
            </li>
            {role === 'admin' && (
              <li>
                <Link to="/orders/all">All Orders</Link>
              </li>
              
              
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
