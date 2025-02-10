const { User } = require("../models/User");

let auth = async (req, res, next) => {
  try {
    // 클라이언트 쿠키에서 토큰을 가져옴
    const token = req.cookies.x_auth;
    if (!token) return res.json({ isAuth: false, error: true });

    // 토큰을 복호화한 후 유저를 찾는다
    const user = await User.findByToken(token);
    if (!user) return res.json({ isAuth: false, error: true });

    // 요청 객체에 토큰과 유저 정보를 추가
    req.token = token;
    req.user = user;

    next(); // 다음 미들웨어 실행
  } catch (err) {
    return res
      .status(400)
      .json({ isAuth: false, error: true, message: "Invalid token" });
  }
};

module.exports = { auth };
