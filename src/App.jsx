import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import Router components
import Movie from './Movie';
import MoviesForm from './MoviesForm'; //
import './App.css';

function AddMoviePage({ onAddMovie }) {
  return (
    <div>
      <h2>Add New Movie</h2>
      <MoviesForm onAddMovie={onAddMovie} />
      <Link to="/">Back to Movies List</Link> {/* Link back to the main page */}
    </div>
  );
}

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
      // In your App.jsx, the MongoDB uses _id, so you should filter by _id.
      setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <Link to="/add-movie">
        <button>Add Movie</button> {/* This is your new "Add Movie" button */}
      </Link>
      <hr />

      <Routes> {/* Define your routes here */}
        <Route path="/" element={
          <>
            {movies.map((movie) => (
              <Movie
                // In App.jsx you are passing movie.id but it should be movie._id
                key={movie._id}
                id={movie._id}
                title={movie.title}
                description={movie.description}
                rating={movie.rating}
                onDelete={deleteMovie}
              />
            ))}
          </>
        } />
        <Route path="/add-movie" element={<AddMoviePage onAddMovie={addMovie} />} />
      </Routes>
    </div>
  );
}

export default App;