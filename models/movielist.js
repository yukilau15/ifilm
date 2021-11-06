const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Movies = mongoose.model("movie", movieSchema);

module.exports = Movies;
