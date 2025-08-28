import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMovie({ movies, setMovies }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      id: movies.length ? movies[movies.length - 1].id + 1 : 1,
      title,
      year,
      genre,
    };
    setMovies([...movies, newMovie]);
    navigate("/");
  };

  return (
    <div>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        /><br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddMovie;
