const Export = require("../../controllers/SearchController");
const { getMoveByMoveId } = require("../../services/search/getMoveByMoveId");

const linkDataArrToDB = async (dataArr) => {
  let resArr = dataArr.map((data) => {
    for (let i = 0; i < 3; i++) {
      const movesArr = data[String(i)].temoti.waza;
      movesArr.map((waza) => {
        const moveName = getMoveByMoveId(waza.id, Export.db);
        waza.name = moveName;
      });
    }
  });
  console.log(resArr);
};

module.exports = { linkDataArrToDB };
