const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const Users = require("../models/users");
const Sessions = require("../models/sessions");

router.get("/", auth, async (req, res) => {
  try {
    const user = (await Users.findById(req.user.id)).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

router.get("/session", async (req, res) => {
  const { token } = req.body;

  const jwt = token;

  let session = await Sessions.findOne(jwt);

  if (session) {
    const _id = session.user_id;

    Users.findById(_id)
    .then((user) => res.status(200).json({user}))
    .catch((err) => res.status(400).send(err));

    //res.status(200).json(session.user_id)
  }
});

//REQUEST FIND USER BY ID AND UPDATE
router.put("/update/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.bio = req.body.bio;

      user
        .save()
        .then(() => res.json("Update successfully!"))
        .catch((err) => res.status(400).send(err));
    })
});

//REQUEST SIGNIN
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email });

  if (!user) {
    res.json("User not found");
  } else {
    const password_match = await bcrypt.compare(password, user.password);

    if (!password_match) {
      res.json("Password wrong");
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

          const user_id = user.id;
          const jwt = token;

          session = new Sessions({
            user_id,
            jwt,
          });

          session
            .save()
            .then(() => res.json("Add succesfully"))
            .catch(() => res.json("Error"));
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
    res.json("Email is taken");
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
      .catch(() => res.json("Fail to create an account"));

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

//REQUEST FIND USER BY ID AND UPDATE
router.put("/update/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.bio = req.body.bio;

      user
        .save()
        .then(() => res.json("Update successfully!"))
        .catch((err) => res.status(400).send(err));
    })
});

//REQUEST FIND USER BY ID AND DELETE
router.post("/delete", (req, res) => {
  const { uid } = req.body;

  const user_id = uid;

  Sessions.findOneAndDelete({user_id})
    .then(() => res.json("Delete successfully!"))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
