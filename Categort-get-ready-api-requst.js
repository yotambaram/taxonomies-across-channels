const axios = require("axios");

async function CategorygetReadyResultsApi(exampleResponsetObj) {
  
  let timesToCall = Math.ceil(exampleResponsetObj["items"]/10);
  let currentRequestId = exampleResponsetObj.requestId
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };
  const query =
    "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";
  
  try {
    const apiCallPromisesArr = [];
    for (let i = 0; i < timesToCall; i++) {
      
      apiCallPromisesArr.push(axios.request({
        method: "get",
        headers: headersObj,
        url: query
      })
    );

    }
    
    let result = Promise.all(apiCallPromisesArr);
    return result;
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.CategorygetReadyResultsApi = CategorygetReadyResultsApi;
