const express = require("express");
const app = express();
const port = 5001;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("Mongoose Connect"))
  .catch((err) => console.log("Mongoose Error:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.status(400).json({ success: false, err }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
