import { useEffect, useState } from "react";
import axios from "axios";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setFavorites(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFavorites();
  }, []);

  //remove from fav👇

  const removeFavorite = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      `http://localhost:5000/api/favorites/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setFavorites(favorites.filter((movie) => movie._id !== id));
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="favorites-page">
      <h1>My Favorites ❤️</h1>

      <div className="movie-grid">
        {favorites.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <img src={movie.poster} alt={movie.title} />

            <h3>{movie.title}</h3>
            <p>{movie.year}</p>

            <button onClick={() => removeFavorite(movie._id)}>
            Remove ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;