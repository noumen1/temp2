import { useState, useEffect } from 'react';
import Movie from './Movie';
import MoviesForm from './MoviesForm';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/movies'); // Your backend URL
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const addMovie = async (newMovie) => {
    try {
      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedMovie = await response.json();
      setMovies(prevMovies => [...prevMovies, addedMovie]);
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id)); // MongoDB uses _id
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <>
      <h1>Movies</h1>
      <MoviesForm onAddMovie={addMovie} />
      {movies.map((movie) => (
        <Movie
          key={movie._id} // MongoDB uses _id
          id={movie._id}
          title={movie.title}
          description={movie.description}
          rating={movie.rating}
          onDelete={deleteMovie}
        />
      ))}
    </>
  );
}

export default App;