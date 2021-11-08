const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.ALAS_URI);

app.use(cors());
app.use(express.json());

const uri = process.env.ALAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB connection established successfully!")
);

if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use("/users", require("./routes/users"));
app.use("/films", require("./routes/films"));

app.listen(port, () => console.log(`The app is running on Port: ${port}`));
