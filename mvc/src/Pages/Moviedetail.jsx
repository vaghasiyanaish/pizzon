import { useParams, Link } from "react-router-dom";

function MovieDetails({ movies }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div>
        <h1>Movie Not Found</h1>
        <Link to="/">⬅ Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{movie.title} ({movie.year})</h1>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Movie ID:</strong> {movie.id}</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/">
          <button className="btn btn-add">⬅ Back</button>
        </Link>
      </div>
    </div>
  );
}

export default MovieDetails;
