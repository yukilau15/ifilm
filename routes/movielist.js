const express = require("express");
const router = express.Router();
const Movies = require("../models/movielist");

//REQUEST GET ALL MOVIES
router.get("/", (req, res) => {
  Users.find()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).send(err));
});

//REQUEST SAVE MOVIE
router.post("/add", (req, res) => {
  const newMovie = new Movies({
    movie_id: req.body.movie_id,
  });

  newMovie
    .save()
    .then(() => res.json("Save movie successfully!"))
    .catch((err) => res.status(400).send(err));
});

//REQUEST FIND MOVIE BY ID AND UPDATE
router.put("/update/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  Movies.findByIdAndDelete(req.params.id)
    .then(() => res.json("Delete successfully!"))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
