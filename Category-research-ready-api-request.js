const axios = require("axios");

async function CategoryGetReadyResultsApi(query) {

  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };
  
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
      return result;

    }
    getReadyResultsRec()
    return result
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.CategoryGetReadyResultsApi = CategoryGetReadyResultsApi;
