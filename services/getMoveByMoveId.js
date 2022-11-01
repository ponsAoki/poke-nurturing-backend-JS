const getMoveByMoveId = async (id, db) => {
  const collection = db.collection("moves");
  const gotData = await collection.findOne({ id: id });
  res.send(gotData);
  return gotData.jname;
};

module.exports = { getMoveByMoveId };
