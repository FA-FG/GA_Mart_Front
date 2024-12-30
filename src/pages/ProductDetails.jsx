import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {
  const { gameId } = useParams()
  const [gameDetails, setGameDetails] = useState({})

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_RAWG_KEY

    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
        )
        setGameDetails(response.data)
      } catch (error) {
        console.error('Error fetching game details:', error)
      }
    }

    fetchGameDetails()
  }, [gameId])

  return (
    <div className="game-content">
      <section className="image-container">
        <div>
          <img src={gameDetails.background_image} alt={gameDetails.name} />
        </div>
      </section>
      <section className="details">
        <div className="flex-row space">
          <h2>{gameDetails.name}</h2>
          <h2>Rating: {gameDetails.rating}/5</h2>
        </div>
        <div>
          <h3></h3>
          <h3>Description</h3>
          <p>{gameDetails.description_raw}</p>
        </div>
      </section>
    </div>
  )
}
export default ProductDetails
