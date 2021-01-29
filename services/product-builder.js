
const Product = require("../models/Product");
const {csvReader} = require("./csv-reader")

async function productBuilder(dataResults, path) {
    // Get worker DB (with sql it can be get worker where workersDB[i].requestId === currentRequestId)
    let workersDB = await csvReader(path)
    let currentRequestId = dataResults.result[0].requestId;
    let browseNodeId;
    let numberOfResultAskedFor;
    for(let i = 0; i < workersDB.length; i++) {
      if(workersDB[i].requestId === currentRequestId) { //if workerDB will be obj, i wont iterate it each time to find the data
        browseNodeId = workersDB[i].id;
        numberOfResultAskedFor = workersDB[i].numberOfResultAskFor;
      }
    }    
    ProductsArr = [];
    for (let i = 0; i < dataResults.result.length; i++) {
      resultAid = dataResults.result[i].result.aid
      let newProduct = new Product(currentRequestId, browseNodeId, numberOfResultAskedFor, resultAid)   
      ProductsArr.push(newProduct)
    }
    
    return ProductsArr
  }


  module.exports.productBuilder = productBuilder