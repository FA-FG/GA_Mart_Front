import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ProuductCard from '../components/ProuductCard'
const ViewProduct = () => {
  const navigate = useNavigate()

  const { genreId } = useParams()

  const [games, setGames] = useState([])

  const getGamesByGenre = async () => {
    const API_KEY = import.meta.env.VITE_RAWG_KEY

    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?page_size=40&genres=${genreId}&key=${API_KEY}`
      )
      setGames(response.data.results)
    } catch (error) {
      console.error('Error fetching games by genre:', error)
    }
  }

  useEffect(() => {
    if (genreId) {
      getGamesByGenre()
    }
  }, [genreId])

  return (
    <div className="container-grid">
      {games.map((game) =>{
        console.log("The game is:",games)
        return (
        <ProuductCard
          key={game.id}
          onClick={() => navigate(`/product/${game.id}`)}
          image={game.background_image}
          name={game.name}
          rating={game.rating}
        />
      )})}
    </div>
  )
}

export default ViewProduct
