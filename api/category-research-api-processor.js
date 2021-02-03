const axios = require("axios");
const Worker = require("../models/Worker")

async function categoryResearchApiProcessor(categoryIdArr) {
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };

  const queriesArr = [];

  try {
    const apiCallPromisesArr = [];
    // Build queries array with request
    for (let i = 0; i < categoryIdArr.length; i++) {
      let id = categoryIdArr[i].categoryId;
      let currentNumberOfResults = categoryIdArr[i].numberOfResults;
      
      let currentQuery = `https://api.algopix.com/v3/category/analysisAsync?browseNodeId=${id}&maxItems=${currentNumberOfResults}`;
     
      apiCallPromisesArr.push(axios.get(currentQuery, { headers: headersObj }));
    }

    const resultArr = [];
    // Execute api get arr (all queries) and build array of api results
    return axios.all(apiCallPromisesArr).then(
      axios.spread((...args) => {
        for (let i = 0; i < args.length; i++) {
          // TODO: if succss/200
          resultArr[i] = {"categoryRequestID":args[i].data.requestId, "categoryId":categoryIdArr[i].categoryId, "processStatus":true}; 
        }
        return resultArr;
      })
    );
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.categoryResearchApiProcessor = categoryResearchApiProcessor;
