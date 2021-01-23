const axios = require("axios");

async function requestForCategoty(InputDataArr) {
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };

  const queriesArr = [];

  for (let i = 0; i < InputDataArr.length; i++) {
    console.log(InputDataArr[i]);
    let id = InputDataArr[i].id;
    let currentNumberOfResults = InputDataArr[i].numberOfResults;
    let currentQuery = `https://api.algopix.com/v3/category/analysisAsync?browseNodeId=${id}&maxItems=${currentNumberOfResults}`;
    queriesArr.push(currentQuery);
  }

  try {
    const apiCallPromisesArr = [];
    for (let i = 0; i < queriesArr.length; i++) {
      let query = queriesArr[i];
      apiCallPromisesArr.push(axios.get(query, { headers: headersObj }));
    }
    
    const result = [];

    return axios.all(apiCallPromisesArr).then(
      
      axios.spread((...args) => {
        for (let i = 0; i < args.length; i++) {
          // TODO: if succss/200
          result.push(args[i].data.requestId);
        }
        return result;
      })
    );

    ///////////////////
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.requestForCategoty = requestForCategoty;
