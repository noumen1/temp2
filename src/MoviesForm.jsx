import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MoviesForm({ onAddMovie }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')

    const Navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newMovie = {
            title,
            description,
            rating
        }

        onAddMovie(newMovie)
        setTitle('')
        setDescription('')
        setRating('')
        Navigate('/')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
            <button type="submit">Add Movie</button>
        </form>
    )
}

export default MoviesForm