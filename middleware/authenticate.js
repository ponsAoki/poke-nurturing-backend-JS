const jwt = require("jsonwebtoken");

//トークンの検証
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json("アクセストークンが含まれていません。");

  jwt.verify(token, "AzQ,PI)0(", (err, user) => {
    if (err) {
      return res
        .status(402)
        .json({
          message: "アクセストークンが有効ではありませんよ。",
          error: err,
        });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticate;
