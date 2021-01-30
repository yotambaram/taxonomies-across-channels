const axios = require("axios");
const Worker = require("../models/Worker")

async function categoryResearchApi(InputDataArr) {
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };

  const queriesArr = [];

  // for (let i = 0; i < InputDataArr.length; i++) {
  //   console.log(InputDataArr[i]);
  //   let id = InputDataArr[i].id;
  //   let currentNumberOfResults = InputDataArr[i].numberOfResults;
  //   let currentQuery = `https://api.algopix.com/v3/category/analysisAsync?browseNodeId=${id}&maxItems=${currentNumberOfResults}`;
  //   queriesArr.push(currentQuery);
  // }

  try {
    const apiCallPromisesArr = [];
    for (let i = 0; i < InputDataArr.length; i++) {
      let id = InputDataArr[i].id;
      let currentNumberOfResults = InputDataArr[i].numberOfResults;
      let currentQuery = `https://api.algopix.com/v3/category/analysisAsync?browseNodeId=${id}&maxItems=${currentNumberOfResults}`;
     
      apiCallPromisesArr.push(axios.get(currentQuery, { headers: headersObj }));
    }

    const resultArr = [];

    return axios.all(apiCallPromisesArr).then(
      axios.spread((...args) => {
        for (let i = 0; i < args.length; i++) {
          // TODO: if succss/200
          let worker = new Worker(args[i].data.requestId, InputDataArr[i].id,InputDataArr[i].numberOfResults)
          resultArr.push(JSON.parse(JSON.stringify(worker)));
        }
        return resultArr;
      })
    );
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.categoryResearchApi = categoryResearchApi;
