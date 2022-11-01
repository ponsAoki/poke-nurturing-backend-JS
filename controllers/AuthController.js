const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//test
const testFunc = (req, res) => {
  console.log("authのtestFuncです");
};

//ユーザー登録
const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      name: req.body.name,
      // email: req.body.email,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: "ユーザー登録完了!",
        });
      })
      .catch((error) => {
        res.json({
          message: "ユーザー登録に失敗しました",
        });
      });
  });
};

//ログイン
const login = async (req, res, next) => {
  const userName = req.body.username;
  const password = req.body.password;
  console.log(userName);

  //userNameが一致するレコードをDBから取得
  const user = await User.findOne({ name: userName });

  //userNameが見つからなかった場合
  if (!user) return res.status(401).json("ユーザー登録されていないようです");

  //入力されたパスワードとDBのパスワード比較
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    console.log("パスワードが違います");
    return res.status(401).json("パスワードが違います");
  }

  //パスワードが正しかった場合
  let token = jwt.sign({ name: user.name }, "AzQ,PI)0(", { expiresIn: "1h" });
  let refreshToken = jwt.sign({ name: user.name }, "refreshTokenSecret", {
    expiresIn: "48h",
  });
  return res.status(200).json({
    message: "ログイン完了!",
    token,
    refreshToken,
  });
};

//トークンリフレッシュ
const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, "refreshTokenSecret", (err, decode) => {
    if (err) {
      res.status(400).json({
        err,
      });
    } else {
      let token = jwt.sign({ name: decode.name }, "AzQ,PI)0(", {
        expiresIn: "60s",
      });
      let refreshToken = req.body.refreshToken;
      res.status(200).json({
        message: "トークンのリフレッシュ成功！",
        token,
        refreshToken,
      });
    }
  });
};

//トークン検証後に、有効なトークンに基づいてユーザー情報を取得する関数
const getUser = async (req, res) => {
  const user = await User.findOne({ name: req.user.name });
  console.log("getUser関数内です");

  if (!user) return res.status(404).json("ユーザーが存在しません");
  res.status(200).json(user);
};

module.exports = {
  register,
  login,
  refreshToken,
  getUser,
  testFunc,
};
