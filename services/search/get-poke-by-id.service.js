const Post = require("../../models/posts");
const ObjectId = require("mongodb").ObjectId;

const getPokeById = async (req, res, db) => {
  const id = req.params.id;
  try {
    const Data = await Post.findById(id);

    const collection = db.collection("poke_data8");
    //検索
    collection.findOne({ _id: ObjectId(Data.pokemon[0]) }, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getPokeById };
