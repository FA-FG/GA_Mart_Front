import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">signIn</Link>
        <Link to="/register">register</Link>
      </nav>
    </header>
  )
}

export default Header
