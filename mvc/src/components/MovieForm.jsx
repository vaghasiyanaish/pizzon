import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieForm({ addMovie }) {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    year: "",
    genre: "",
    rating: "",
    language: "",
    duration: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(movie);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Movie Title" onChange={handleChange} required />
        <input name="director" placeholder="Director" onChange={handleChange} required />
        <input name="year" placeholder="Release Year" onChange={handleChange} required />
        <input name="genre" placeholder="Genre" onChange={handleChange} required />
        <input name="rating" placeholder="Rating (1-10)" onChange={handleChange} required />
        <input name="language" placeholder="Language" onChange={handleChange} required />
        <input name="duration" placeholder="Duration (minutes)" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <button type="submit" className="btn">Add Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;
