const axios = require("axios");

async function requestForCategoty() {
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };
  const query =
    "https://api.algopix.com/v3/category/analysisAsync?browseNodeId=14284826011&maxItems=65";
  ////////
  try {
   
 
    const apiCallPromisesArr = [];
    for (let i = 0; i < 5; i++) {
      // 20 is the numbers of requests (Request for a category:maxItems/10 times)
      apiCallPromisesArr.push(axios.get(query, { headers: headersObj }));
      
    }
    
    let result = Promise.all(apiCallPromisesArr);
    return result;
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.requestForCategoty = requestForCategoty;
