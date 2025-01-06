import './App.css'
import AppRoutes from './routes'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <AppRoutes />
      </div>
    </>
  )
}

export default App
