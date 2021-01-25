const axios = require("axios");

async function CategoryGetReadyResultsApi(exampleResponsetArr) {
  //   // exampleResponsetObj = [{
//     "browseNodeId": 6358540011,
//     "resultRequested": 30,
//     "requestId": "1652a40a-0349-45e3-9da6-a9efde766332"
// }]


  //let timesToCall = Math.ceil(20/*exampleResponsetArr[0]["resultRequested"]/10*/);
  let currentRequestId = exampleResponsetArr.requestId
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };
  const query =
    "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";
  
  try {
    let result
    const apiCallPromisesArr = [];
    const getReadyResultsRec = () => {
        apiCallPromisesArr.push(axios.request({
          method: "get",
          headers: headersObj,
          url: query
        })
      );

      result = Promise.all(apiCallPromisesArr);
      console.log(result)
      //return result;

    }
    getReadyResultsRec()
    return result
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.CategoryGetReadyResultsApi = CategoryGetReadyResultsApi;
