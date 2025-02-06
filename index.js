const express = require("express");
const app = express();
const port = 5001;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://wooyoung:chldndud1!@boilerplate.thpdd.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate"
  )
  .then(() => console.log("Mongoose Connect"))
  .catch((err) => console.log("Mongoose Error:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
