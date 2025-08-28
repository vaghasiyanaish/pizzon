import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import AddMovie from "./Pages/Addmovie";
import EditMovie from "./Pages/Editmovie";
import Moviedetail from "./Pages/Moviedetail";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([
    
  ]);

  return (
    <Router>
      <div className="container">
        <h1>🎬 Movie Collector</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add">Add Movie</Link>
        </div>

        <Routes>
          <Route path="/" element={<Home movies={movies} setMovies={setMovies} />} />
          <Route path="/add" element={<AddMovie movies={movies} setMovies={setMovies} />} />
          <Route path="/edit/:id" element={<EditMovie movies={movies} setMovies={setMovies} />} />
          <Route path="/details/:id" element={<Moviedetail movies={movies} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
