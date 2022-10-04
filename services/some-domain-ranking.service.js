const { default: axios } = require("axios");

const someDomainRanking = async () => {
  let resArr = [];
  await (async () => {
    for (let i = 1; i < 5; i++) {
      const apiRes = await axios.get(
        `https://resource.pokemon-home.com/battledata/ranking/10342/0/1662560377/pdetail-${i}`
      );
      console.log(apiRes.data);
      resArr.push(apiRes.data);
    }
  })();
  return resArr;
};

module.exports = { someDomainRanking };
