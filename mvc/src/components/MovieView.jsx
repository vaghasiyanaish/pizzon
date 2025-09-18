import React from "react";
import { useParams, Link } from "react-router-dom";

function MovieView({ movies }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) return <h2>Movie Not Found</h2>;

  return (
    <div className="view-container">
      <div className="view-details">
        <h2>{movie.title}</h2>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Rating:</strong> {movie.rating}/10</p>
        <p><strong>Language:</strong> {movie.language}</p>
        <p><strong>Duration:</strong> {movie.duration} min</p>
        <p><strong>Description:</strong> {movie.description}</p>
        <Link to="/" className="btn">Back</Link>
      </div>
    </div>
  );
}

export default MovieView;
