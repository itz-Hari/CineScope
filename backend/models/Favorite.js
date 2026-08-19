const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  movieId: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  poster: {
    type: String
  },

  year: {
    type: String
  }
});

module.exports = mongoose.model("Favorite", favoriteSchema);