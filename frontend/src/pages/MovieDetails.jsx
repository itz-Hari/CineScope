import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  //Add Favorites
  const addFavorite = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/favorites",
      {
        movieId: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        year: movie.Year
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Added to favorites ❤️");
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    const getMovie = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/movies/${id}`
      );

      setMovie(response.data);
    };

    getMovie();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-details">
      <img src={movie.Poster} alt={movie.Title} />

      <div>
        <h1>{movie.Title}</h1>

        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>IMDb:</strong> {movie.imdbRating}</p>

        <p>{movie.Plot}</p>

        <button onClick={addFavorite}>Add to Favorites ❤️</button>
      </div>
    </div>
  );
}

export default MovieDetails;