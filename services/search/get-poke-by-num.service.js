const getPokeByNum = (req, res, db) => {
  const Pokemon = req.body;
  const collection = db.collection("poke_data8");
  //検索
  collection.find({ no: Pokemon.no }).toArray((err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = { getPokeByNum };
