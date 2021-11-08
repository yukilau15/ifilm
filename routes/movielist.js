const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Users = require("../models/users");
const Movies = require("../models/movielist");

//REQUEST GET ALL MOVIES
router.get("/", auth, async (req, res) => {
  try {
    const movie = (await Movies.findById(req.user.id)).sort({ date: -1 });
    res.json(movie);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

//REQUEST SAVE MOVIE
router.post("/add", (req, res) => {
  const newMovie = new Movies({
    movie_id: req.body.movies,
  });

  newMovie
    .save()
    .then(() => res.json("Save movie successfully!"))
    .catch((err) => res.status(400).send(err));
});

//REQUEST FIND MOVIE BY ID AND UPDATE
router.put("/update/:id", auth, (req, res) => {
  Movies.findById(req.params.id)
    .then((movie) => {
      movie.name = req.body.name;
      movie.email = req.body.email;

      movie
        .save()
        .then(() => res.json("Update successfully!"))
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
});

//REQUEST FIND MOVIE BY ID AND DELETE
router.delete("/:id", auth, (req, res) => {
  Movies.findByIdAndDelete(req.params.id)
    .then(() => res.json("Delete successfully!"))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
