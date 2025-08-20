import React, { useState } from "react";


function CrudApp() {
  const [movies, setMovies] = useState([
    
  ]);

  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  // Add Movie
  const handleAdd = () => {
    if (!newMovie.title || !newMovie.year) return;
    setMovies([
      ...movies,
      { id: Date.now(), ...newMovie, rating: Number(newMovie.rating) || 0 },
    ]);
    setNewMovie({ title: "", year: "", genre: "", rating: "", description: "" });
  };

  // Edit Movie
  const handleEdit = (movie) => {
    setEditId(movie.id);
    setNewMovie(movie);
  };

  // Update Movie
  const handleUpdate = () => {
    setMovies(
      movies.map((m) => (m.id === editId ? { ...m, ...newMovie } : m))
    );
    setEditId(null);
    setNewMovie({ title: "", year: "", genre: "", rating: "", description: "" });
  };

  // Delete Movie
  const handleDelete = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  return (
    <div className="app">
      <h1>🎬 Movie Management System</h1>

      {/* Form Section */}
      <div className="form">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={newMovie.title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Release Year"
          value={newMovie.year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating (0-10)"
          value={newMovie.rating}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={newMovie.description}
          onChange={handleChange}
        ></textarea>

        {editId ? (
          <button className="update" onClick={handleUpdate}>
            Update Movie
          </button>
        ) : (
          <button className="add" onClick={handleAdd}>
            Add Movie
          </button>
        )}
      </div>

      {/* Movie List */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.title}</h2>
            <p><b>Year:</b> {movie.year}</p>
            <p><b>Genre:</b> {movie.genre}</p>
            <p><b>Rating:</b> ⭐ {movie.rating}</p>
            <p className="desc">{movie.description}</p>

            <div className="actions">
              <button className="edit" onClick={() => handleEdit(movie)}>
                ✏️ Edit
              </button>
              <button className="delete" onClick={() => handleDelete(movie.id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrudApp;
