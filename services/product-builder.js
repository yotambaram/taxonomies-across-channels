
const Product = require("../models/Product");
const {csvReader} = require("./csv-reader")

async function productsBuilder(dataResults) {
  
    // Get worker DB (with sql it can be get worker where workersDB[i].requestId === currentRequestId)
    let workersDB = await csvReader("./db/category-workers-db.csv")
    //console.log("string",workersDB["5718ab34-fe60-430c-b822-ff57bfea54fb"])
    console.log("product-builder workersDB",workersDB.has("5718ab34-fe60-430c-b822-ff57bfea54fb"))
    let currentRequestId = dataResults.result[0].requestId;
    let currentBrowseNodeId;
    let currwntNumberOfResultAskedFor;
    for(let i = 0; i < workersDB.length; i++) {
      if(workersDB[i].requestId === currentRequestId) { //if workerDB will be obj, i wont iterate it each time to find the data
        currentBrowseNodeId = workersDB[i].id;
        currwntNumberOfResultAskedFor = workersDB[i].numberOfResultAskFor;
      }
    }    
    ProductsArr = [];
    for (let i = 0; i < dataResults.result.length; i++) {
      let resultAid = dataResults.result[i].result.aid
      let newProduct = new Product(currentRequestId, currentBrowseNodeId, currwntNumberOfResultAskedFor, resultAid)   
      ProductsArr.push(newProduct)
    }
    
    return ProductsArr
  }


  module.exports.productsBuilder = productsBuilder