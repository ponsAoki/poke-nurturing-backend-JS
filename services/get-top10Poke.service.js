const { default: axios } = require("axios");

const getTopTenPoke = async (req, res, db) => {
  const topTeers = await axios.get(
    "https://resource.pokemon-home.com/battledata/ranking/10342/0/1662560377/pokemon"
  );
  const topTenArr = topTeers.data.slice(0, 10);

  const numSearchFunc = async (poke, num) => {
    const cursor = db.collection("poke_data8").find({ no: num }).toArray();
    return await cursor.then((results) => {
      const applicablePoke = results[poke.form];
      poke.name = `${applicablePoke.name} ${applicablePoke.form}`;
      return poke.name;
    });
  };

  let resArr = [];
  await topTenArr.map(async (poke, i) => {
    const num = await poke.id;
    poke.index = await i;
    const pokeName = await numSearchFunc(poke, num);
    const resObj = {
      index: poke.index,
      id: num,
      form: poke.form,
      name: pokeName,
    };
    resArr.push(resObj);
    if (resArr.length === 10) {
      resArr.sort((a, b) => a.index - b.index);
      res.send(resArr);
    }
  });
};

module.exports = { getTopTenPoke };
