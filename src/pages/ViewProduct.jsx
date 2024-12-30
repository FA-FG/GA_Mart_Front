import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ProuductCard from '../components/ProuductCard'
const ViewProduct = () => {
  const navigate = useNavigate()

  const { genreId } = useParams()
  console.log(`id:${genreId}`)

  const [games, setGames] = useState([])
  

  const getGamesByGenre = async () => { 
    const API_KEY = import.meta.env.VITE_RAWG_KEY
  


      const response = await axios.get(
  
        `https://api.rawg.io/api/games?genres=${genreId}&key=${API_KEY}&page_size=40`
        
      )
      const x = response.data.results
      console.log(x)
      setGames(response.data.results)
   
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
