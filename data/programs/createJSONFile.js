const fs = require("fs");
const { default: axios } = require("axios");
const { domainRankDataLogic } = require("./serveDomainRankData");
const { linkDataArrToDB } = require("./linkDataArrToDB");
(async () => {
  let dataArr = [];

  const forFunc = async (dataArr) => {
    for (let i = 1; i < 6; i++) {
      await domainRankDataLogic(dataArr, i);
    }
  };
  // domainRankDataLogic();
  await forFunc(dataArr);

  // console.log(dataArr);

  await linkDataArrToDB(dataArr);

  const createFile = (pathName, data) => {
    const pathIsExist = dupliCheck(pathName);
    if (pathIsExist) console.log("指定したパスが見つかりました。");

    const toJSON = JSON.stringify(data);
    fs.writeFile(pathName, toJSON, (err) => {
      if (err) throw err;
      if (!err) console.log("JSONファイルの生成に成功しました。");
    });
  };

  const dupliCheck = (pathName) => {
    try {
      fs.statSync(pathName);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  createFile(
    "/Users/aosho/my-projects/original-apps/pokeapp-2/poke-nurturing-backend-JS/data/generated/newGenerated.json",
    dataArr
  );
})();
