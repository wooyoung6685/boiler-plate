const express = require("express");
const app = express();
const port = 5001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

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

app.get("/hello", (req, res) => {
  res.send("어서오고");
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.status(400).json({ success: false, err }));
});

app.post("/api/users/login", (req, res) => {
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

app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 authorization 이 true 라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" }, // 빈 문자열로 변경 (null 또는 undefined 사용 가능)
      { new: true } // 업데이트 후 변경된 데이터 반환
    );

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
