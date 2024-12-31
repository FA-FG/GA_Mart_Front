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
        </nav>
      </div>
    </header>
  )
}

export default Header
