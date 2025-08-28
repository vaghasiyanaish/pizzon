import { Link } from "react-router-dom";

function Home({ movies, setMovies }) {
  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div>
      {movies.length === 0 ? (
        <p>No movies yet. Add your first one!</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="movie-card">
              <div className="movie-info">
                <h2>{movie.title} ({movie.year})</h2>
                <p>{movie.genre}</p>
              </div>
              <div>
                <Link to={`/details/${movie.id}`}>
                  <button className="btn btn-add">View Details</button>
                </Link>
                <Link to={`/edit/${movie.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button onClick={() => deleteMovie(movie.id)} className="btn btn-delete">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add">
        <button className="btn btn-add" style={{ marginTop: "15px" }}>
          ➕ Add Movie
        </button>
      </Link>
    </div>
  );
}

export default Home;
