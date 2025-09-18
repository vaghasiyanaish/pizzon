import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieEdit({ movies, updateMovie }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(id));
  const [formData, setFormData] = useState(movie);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movie.id, formData);
    navigate("/");
  };

  if (!movie) return <h2>Movie Not Found</h2>;

  return (
    <div className="form-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="director" value={formData.director} onChange={handleChange} />
        <input name="year" value={formData.year} onChange={handleChange} />
        <input name="genre" value={formData.genre} onChange={handleChange} />
        <input name="rating" value={formData.rating} onChange={handleChange} />
        <input name="language" value={formData.language} onChange={handleChange} />
        <input name="duration" value={formData.duration} onChange={handleChange} />
        <textarea name="description" value={formData.description} onChange={handleChange} />
        <button type="submit" className="btn">Update</button>
      </form>
    </div>
  );
}

export default MovieEdit;
