const express = require("express");

const Favorite = require("../models/Favorite");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { movieId, title, poster, year } = req.body;

    // Check if movie is already in favorites
    const existingFavorite = await Favorite.findOne({
      userId: req.userId,
      movieId
    });

    if (existingFavorite) {
      return res.status(400).json({
        message: "Movie already in favorites"
      });
    }

    // Add movie to favorites
    const favorite = await Favorite.create({
      userId: req.userId,
      movieId,
      title,
      poster,
      year
    });

    res.status(201).json(favorite);

  } catch (error) {
    res.status(500).json({
      message: "Failed to add favorite"
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userId: req.userId
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get favorites"
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    res.json({
      message: "Favorite removed"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove favorite"
    });
  }
});

module.exports = router;