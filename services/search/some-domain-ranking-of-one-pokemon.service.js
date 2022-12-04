const someDomainRankingOfOnePokemon = async (req, res, db) => {
  const pokeNum = req.body.pokeNum;
  const collection = db.collection("domainsRank");

  //検索
  collection.find({ no: pokeNum }).toArray((err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = { someDomainRankingOfOnePokemon };
