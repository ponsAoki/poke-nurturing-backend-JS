const { MongoClient, ServerApiVersion } = require("mongodb");
const {
  someDomainRankingOfOnePokemon,
} = require("../services/some-domain-ranking-of-one-pokemon.service");
const { getTopTenPoke } = require("../services/get-top10Poke.service");
const { getPokeByNum } = require("../services/get-poke-by-num.service");
const { getPokeById } = require("../services/get-poke-by-id.service");

const uri = process.env.CLIENT_URI;
//MongoClient接続
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) =>
  console.log(err ? "MongoClient接続失敗" : "MongoClient接続成功")
);
//「ポケモンDB」に接続
const db = client.db("ポケモンDB");

//ポケモンデータ全件取得
const searchPoke = (req, res) => {
  debugger;
  let poke = [];
  db.collection("poke_data8")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      // console.log(results);
      poke = results;
      res.send(results);
    });
};

//道具データ全件取得
const searchItem = (req, res) => {
  db.collection("items")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
};

//技データ全件取得
const searchMove = (req, res) => {
  db.collection("moves")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
};

//ObjectIdからポケモン1体取得
const searchPokeById = async (req, res) => {
  await getPokeById(req, res, db);
};

//特定の図鑑番号のポケモン全部取得
const searchPokeByNum = (req, res) => {
  return getPokeByNum(req, res, db);
};

//使用率TOP10のポケモンの図鑑番号、名前、フォルムを取得
const searchTopTenOfPoke = async (req, res) => {
  await getTopTenPoke(req, res, db);
};

const someDomainRankingController = async (req, res) => {
  return await someDomainRankingOfOnePokemon(req, res, db);
};

module.exports = {
  searchPoke,
  searchItem,
  searchMove,
  searchPokeById,
  searchPokeByNum,
  searchTopTenOfPoke,
  someDomainRankingController,
};
