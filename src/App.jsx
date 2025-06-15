import { useState } from 'react'
import MoviesData from './MoviesData'
import Movie from './Movie'
import MoviesForm from './MoviesForm'

function App() {

  const [movies, setMovies] = useState(MoviesData)

  const addMovie = (newMovie) => {
    const id = movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1
    const movieWithId = { ...newMovie, id }
    setMovies(prevMovies => [...prevMovies, movieWithId])
  }

  const deleteMovie = (id) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id))
  }
  
  return (
    <>
    <h1>Movies</h1>
    <MoviesForm onAddMovie={addMovie} />
        {movies.map((movie) => (
          <Movie key={movie.id} id={movie.id} title={movie.title} description={movie.description} rating={movie.rating} onDelete={deleteMovie} />
      ))}
    
    </>
  )
}

export default App
