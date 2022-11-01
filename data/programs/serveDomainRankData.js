const { default: axios } = require("axios");

const domainRankDataLogic = async (Arr, tailNum) => {
  const res = await axios
    .get(
      `https://resource.pokemon-home.com/battledata/ranking/10342/0/1662560377/pdetail-${tailNum}`
    )
    .catch((err) => console.log("axiosエラー:", err));
  //   dataArr.push(res.data);

  const data = res.data;
  for (let i = 1; i < 900; i++) {
    if (data[String(i)]) {
      data[String(i)].no = i;
      Arr.push(data[String(i)]);
    }
  }
};

module.exports = { domainRankDataLogic };
