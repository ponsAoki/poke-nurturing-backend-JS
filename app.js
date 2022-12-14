//imports--
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRoute = require("./routes/routesAuth");
const PostRoute = require("./routes/routesPost");
const SearchRoute = require("./routes/routesSearch");

const app = express();
const port = process.env.PORT || 5001;

//ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//DB接続
mongoose
  .connect(process.env.PU_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(err, "app.jsのMongo接続も失敗"));

//api最初のルーティング
app.use("/api/", AuthRoute);
app.use("/api/post", PostRoute);
app.use("/api/search", SearchRoute);

//サーバー起動
app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);
console.log("The value of PORT is:", process.env.PORT);
