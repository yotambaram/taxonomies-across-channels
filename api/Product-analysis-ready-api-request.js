const axios = require("axios");

async function productAnalysisGetReadyResultsApi(requestIDsArr) {
  let FaketimesToCall = 1
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };
  const query =
    "https://api.algopix.com/v3/searchAsync/getReadyResults"
  try {
    const apiCallPromisesArr = [];
    for (let i = 0; i < FaketimesToCall
      
      ; i++) {
      
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

module.exports.productAnalysisGetReadyResultsApi = productAnalysisGetReadyResultsApi;
