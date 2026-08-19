const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      `https://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to search movies"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${req.params.id}&plot=full&apikey=${process.env.OMDB_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get movie"
    });
  }
});

module.exports = router;