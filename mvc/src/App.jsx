import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MovieTable from "./components/MovieTable";
import MovieForm from "./components/MovieForm";
import MovieView from "./components/MovieView";
import MovieEdit from "./components/MovieEdit";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const addMovie = (movie) => {
    setMovies([...movies, { ...movie, id: Date.now() }]);
  };

  const updateMovie = (id, updatedMovie) => {
    setMovies(movies.map((m) => (m.id === id ? updatedMovie : m)));
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<MovieTable movies={movies} deleteMovie={deleteMovie} />}
          />
          <Route path="/add" element={<MovieForm addMovie={addMovie} />} />
          <Route path="/view/:id" element={<MovieView movies={movies} />} />
          <Route
            path="/edit/:id"
            element={<MovieEdit movies={movies} updateMovie={updateMovie} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
