import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Movies.css";

function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");


  const searchMovies = async () => {
    if (!query.trim()) {
      setMessage("Please enter a movie name 🎬");
      setMovies([]);
      return;
    }

    try {
      const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/movies/search?query=${query}`
);

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setMessage("");
      } else {
        setMovies([]);
        setMessage("No movies found! 😕");
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="movies-page">
  
      <h1>Find Your Favorite Movies 🎬</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies();
            }
          }}
        />

        <button onClick={searchMovies}>Search</button>
        
      </div>

      <div className="movie-grid">
        {message && <p className="default-msg">{message}</p>}

        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            className="movie-card"
            key={movie.imdbID}
          >
            <img
              src={movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.Title}
            />

            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movies;