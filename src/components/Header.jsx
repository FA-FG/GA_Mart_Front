import { Link } from 'react-router-dom'

const Header = ({ user, handleLogOut }) => {
  
    let userOptions

    if (user) {
      userOptions = (
        <nav>
          <Link to="/main" className="nav-link">Main Page</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link onClick={handleLogOut} to="/" className="nav-link">Sign Out </Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/orders" className="nav-link">Order</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/add=product" className="nav-link">Add Product</Link>
     
          
        </nav>
      )
    }

    const publicOptions = (
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/register" className="nav-link">register</Link>
        <Link to="/signin" className="nav-link">Sign In</Link>
      </nav>
    )
  

    return (
    <header>
      <Link to="/"></Link>
      {user ? userOptions : publicOptions}
    </header> 
  )
}

export default Header



