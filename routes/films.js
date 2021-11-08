const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Films = require("../models/films");

//REQUEST SAVE FILM
router.post("/add", async (req, res) => {
  const { fid, ftitle, fimage, ftype, foverview } = req.body;

  const film_id = fid;

  let film = await Films.findOne({ film_id });

  if (film) {
    res.json("Error");
  } else {
    const newFilm = new Films({
      film_id: fid,
      title: ftitle,
      image: fimage,
      type: ftype,
      overview: foverview,
    });

    newFilm
      .save()
      .then(() => res.json("Add successfully!"))
      .catch(() => res.json("Error"));
  }
});

//REQUEST GET ALL FILMS
router.get("/all", (req, res) => {
  Films.find()
    .sort({ date: -1 })
    .then((film) => res.status(200).json(film))
    .catch((err) => res.status(400).send(err));
});

//REQUEST FIND FILM BY ID AND DELETE
router.post("/delete", (req, res) => {
  const { fid } = req.body;

  const film_id = fid;

  Films.findOneAndDelete({ film_id })
    .then(() => res.json("Delete successfully!"))
    .catch((err) => res.status(400).send(err));
});

//REQUEST DELETE ALL FILMS
router.delete("/deleteAll", (req, res) => {
  Films.deleteMany({})
    .then(() => res.json("Delete successfully!"))
    .catch((err) => res.status(400).send(err));
});
module.exports = router;
