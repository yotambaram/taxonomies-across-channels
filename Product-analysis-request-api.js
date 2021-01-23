const axios = require("axios");

async function requestForProductAnalysis(/*idsArr*/) {
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };

  /*

      NEEDS QUERY BUILDERFROM Ids to url
      idsArr -> queriesArr
  */
  queriesArr =
    ["https://api.algopix.com/v3/searchAsync?keywords=AIDSICE71001&markets=amazon_us%2Cebay_us%2Cwalmart_us"
  , "https://api.algopix.com/v3/searchAsync?keywords=AIDSICE71001&markets=amazon_us%2Cebay_us%2Cwalmart_us"];
   
  try {
   
    ///////////////////
    const promises = [];
    const result = [];

for (let i = 0; i < queriesArr.length; i++) {
    promises.push(axios.get(queriesArr[i], {headers: headersObj}));
}

return axios.all(promises)
    .then(
      axios.spread((...args) => {
        for (let i = 0; i < args.length; i++) {
          // TODO: if succss/200
            result.push(args[i].data.requestId)
                 
        }
        return result
    }))

  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.requestForProductAnalysis = requestForProductAnalysis;
