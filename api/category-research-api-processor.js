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
    for (let i = 0; i < categoryIdArr.length; i++) {
      let id = categoryIdArr[i].categoryId;
      let currentNumberOfResults = categoryIdArr[i].numberOfResults;
      
      let currentQuery = `https://api.algopix.com/v3/category/analysisAsync?browseNodeId=${id}&maxItems=${currentNumberOfResults}`;
     
      apiCallPromisesArr.push(axios.get(currentQuery, { headers: headersObj }));
    }

    const resultArr = [];
    
    return axios.all(apiCallPromisesArr).then(
      axios.spread((...args) => {
        let workersObj = new Object();
        for (let i = 0; i < args.length; i++) {
          // TODO: if succss/200
          workersObj[args[i].data.requestId] = {"categoryId":categoryIdArr[i].categoryId, "status": 1}; 
        }
        
        return workersObj;
      })
    );
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.categoryResearchApiProcessor = categoryResearchApiProcessor;
