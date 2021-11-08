const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  film_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },overview: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Films = mongoose.model("film", filmSchema);

module.exports = Films;
