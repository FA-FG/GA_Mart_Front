import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/login" className="nav-link">
            signIn
          </Link>
          <Link to="/register" className="nav-link">
            register
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
