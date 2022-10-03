const getPokeByNum = (req, res, db) => {
  const Pokemon = req.body;
  console.log(Pokemon.no);
  const collection = db.collection("poke_data8");
  //検索
  collection.find({ no: Pokemon.no }).toArray((err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

module.exports = { getPokeByNum };
