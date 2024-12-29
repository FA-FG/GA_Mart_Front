import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from '../components/Search'
import ProductCard from '../components/ProuductCard'
import GenreCard from '../components/GenreCard'
import { useNavigate } from 'react-router-dom'
const API_KEY = import.meta.env.VITE_RAWG_KEY

const Home = () => {
  let navigate = useNavigate()
  const [genres, setGenres] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searched, toggleSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        )
        setGenres(response.data.results)
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }
    getGenres()
  }, [])

  const getSearchResults = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}`
      )
      setSearchResults(response.data.results)
      toggleSearched(true)
      setSearchQuery('')
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
      <div className="search">
        <Search
          onSubmit={getSearchResults}
          onChange={handleChange}
          value={searchQuery}
        />
        {searched && (
          <section className="search-results container-grid">
            {searchResults.map((game) => (
              <ProductCard
                key={game.id}
                onClick={() => Navigate(`/product/details/${game.id}`)}
                image={game.background_image}
                name={game.name}
                rating={game.rating}
              />
            ))}
          </section>
        )}
      </div>
      <div className="genres">
        <h2>Genres</h2>
        <section className="container-grid">
          {genres.map((genre) => (
            <GenreCard
              key={genre.id}
              onClick={() => navigate(`/view/products/${genre.id}`)}
              image={genre.image_background}
              name={genre.name}
              gamesCount={genre.games_count}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Home
