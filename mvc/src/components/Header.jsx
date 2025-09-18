import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>🎬 Movie Collector</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Movie</Link>
      </nav>
    </header>
  );
}

export default Header;
