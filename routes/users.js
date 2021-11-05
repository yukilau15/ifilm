const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require("../models/users");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await (await Users.findById(req.user.id)).select('-password')
    res.json(user);
  } catch(err) {
    res.status(500).send("Server Error")
  }
  res.send("Get logged user");
});

//REQUEST SIGNIN
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email });

  if (!user) {
    console.log("User not found");
  } else {
    const password_match = await bcrypt.compare(password, user.password);

    if (!password_match) {
      console.log("Password wrong");
    } else {
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SecretKey,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    }
  }
});

//REQUEST SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await Users.findOne({ email });

  if (user) {
    console.log("Email is taken");
  } else {
    user = new Users({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user
      .save()
      .then(() => res.json("Create and account successfully!"))
      .catch((err) => res.status(400).send(err));

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SecretKey,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json(token);
      }
    );
  }
});

//REQUEST GET ALL USERS
router.get("/", (req, res) => {
  Users.find()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).send(err));
});

//REQUEST FIND USER BY ID
router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).send(err));
});

//REQUEST FIND USER BY ID AND UPDATE
router.put("/update/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;

      user
        .save()
        .then(() => res.json("Update successfully!"))
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
});

//REQUEST FIND USER BY ID AND DELETE
router.delete("/:id", (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.json("Delete successfully!"))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
