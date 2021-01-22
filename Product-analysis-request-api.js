const axios = require("axios");

async function requestForProductAnalysis(ids) {
  const headersObj = {
    "X-APP-ID": process.env.X_APP_ID,
    "X-API-KEY": process.env.X_API_KEY,
  };
  queriesAyy =
    ["https://api.algopix.com/v3/searchAsync?keywords=AID33DF91001&markets=amazon_us", "https://api.algopix.com/v3/searchAsync?keywords=AID2LYFC1001&markets=amazon_us"
  ];
  
  try {
   
    ///////////////////
    const promises = [];
    const result = [];

for (let i = 0; i < queriesAyy.length; i++) {
    promises.push(axios.get(queriesAyy[i], {headers: headersObj}));
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
    // .then(console.log(result))
 
  
    






    /////////////////////

  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
}

module.exports.requestForProductAnalysis = requestForProductAnalysis;
