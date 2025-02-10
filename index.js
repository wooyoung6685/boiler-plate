const express = require("express");
const app = express();
const port = 5001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post("/login", (req, res) => {
  // 이메일이 DB에 있는지 확인
  User.findOne({
    email: req.body.email,
  })
    .then(async (user) => {
      if (!user) {
        throw new Error("제공된 이메일에 해당하는 유저가 없습니다.");
      }
      // 비밀번호가 일치하는지 확인
      const isMatch = await user.comparePassword(req.body.password);
      return { isMatch, user };
    })
    .then(({ isMatch, user }) => {
      console.log(isMatch);
      if (!isMatch) {
        throw new Error("비밀번호가 틀렸습니다.");
      }
      // 로그인 완료
      return user.generateToken();
    })
    .then((user) => {
      // 토큰 저장 (쿠키, localstorage ...)
      return res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true,
        userId: user._id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        loginSuccess: false,
        message: err.message,
      });
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
