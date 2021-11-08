const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  jwt: {
    type: String,
    required: true,
  },
});

const Sessions = mongoose.model("session", sessionSchema);

module.exports = Sessions;
