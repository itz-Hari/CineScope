const express = require("express");
const cors = require("cors");
require("dotenv").config();

const favoriteRoutes = require("./routes/favorites");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movies");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/favorites", favoriteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CineScope backend is running 🎬" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from CineScope backend!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});