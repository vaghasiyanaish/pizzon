import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditMovie({ movies, setMovies }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year);
  const [genre, setGenre] = useState(movie.genre);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovies = movies.map((m) =>
      m.id === parseInt(id) ? { ...m, title, year, genre } : m
    );
    setMovies(updatedMovies);
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        /><br />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditMovie;
