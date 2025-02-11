const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExpiration: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  // 비밀번호 암호화
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  // 암호화된 비밀번호와 같은지 체크
  const user = this;
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateToken = function () {
  // jwt 생성
  user = this;
  const token = jwt.sign(user._id.toJSON(), "secretToken");
  user.token = token;

  return user.save();
};

userSchema.statics.findByToken = async function (token) {
  try {
    const decoded = jwt.verify(token, "secretToken"); // 토큰 검증
    const user = await this.findOne({ _id: decoded, token: token }); // 사용자 찾기
    return user; // 찾은 사용자 반환
  } catch (err) {
    throw err; // 오류 발생 시 예외 처리
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
