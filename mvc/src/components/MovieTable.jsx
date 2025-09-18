import React from "react";
import { Link } from "react-router-dom";

function MovieTable({ movies, deleteMovie }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Language</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No Movies Added
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.year}</td>
                <td>{movie.genre}</td>
                <td>{movie.rating}</td>
                <td>{movie.language}</td>
                <td>{movie.duration} min</td>
                <td>
                  <Link to={`/view/${movie.id}`} className="btn small">
                    View
                  </Link>
                  <Link to={`/edit/${movie.id}`} className="btn small">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMovie(movie.id)}
                    className="btn delete small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MovieTable;
