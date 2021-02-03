const { fileBuilder } = require("./file-builder");
const Product = require("../models/Product");
const {csvReader} = require("./csv-reader")

const pathProductsDb = "./db/category-products-db.csv";

async function productsBuilder(currentCategoryResults) {
  // console.log(currentCategoryResults[0].requestId)
  // console.log(currentCategoryResults[0].result.aid)
  
  let categoryProductsDB = await csvReader(pathProductsDb)
  try {
    newResultsArr = [];
    currentCategoryResults.forEach( CategortResult => {
      let resultObj = new Object;
      resultObj["requestId"] = CategortResult.requestId;
      resultObj["aid"] = CategortResult.result.aid;
      newResultsArr.push(resultObj);
    });
    //console.log(newResultsArr)
    let headers = Object.keys(newResultsArr[0]);
  // write resulte to DB
  console.log("HGGHGHGGHF")
    if (categoryProductsDB) {
      console.log("YESSSSSSSS")
      let write = await csvWriter(newResultsArr, pathProductsDb, headers);
      return write;
    }
    else {
      console.log("NOOOOOOOO")
      await fileBuilder(pathProductsDb, headers);
      let write = await csvWriter(newWorkersArr, pathProductsDb, headers);
      return write;
    }
  } catch {
    console.log("ERROR workerDbBuilder");
  }
  


// update worker status










    // // Get worker DB (with sql it can be get worker where workersDB[i].requestId === currentRequestId)
    // let workersDB = await csvReader("./db/category-workers-db.csv")
    // // map the workers db
    // workersDbMaped = new Object();
    // workersDB.map(worker => {
    //   workersDBmaped[worker.categoryRequestID] = { "categoryId": worker.categoryId, "processStatus": worker.processStatus }
    // })
    
    // let currentRequestId = currentCategoryResults[0].requestId;
    // // let currentBrowseNodeId;
    // // let currwntNumberOfResultAskedFor;
   
    // for(let i = 0; i < workersDB.length; i++) {
    //   if(workersDB[i].requestId === currentRequestId) { //if workerDB will be obj, i wont iterate it each time to find the data
    //     currentBrowseNodeId = workersDB[i].id;
    //     currwntNumberOfResultAskedFor = workersDB[i].numberOfResultAskFor;
    //   }
    // }    
    // ProductsArr = [];
    // for (let i = 0; i < currentCategoryResults.result.length; i++) {
    //   let resultAid = currentCategoryResults.result[i].result.aid
    //   let newProduct = new Product(currentRequestId, currentBrowseNodeId, currwntNumberOfResultAskedFor, resultAid)   
    //   ProductsArr.push(newProduct)
    // }
    
    return ProductsArr
  }


  module.exports.productsBuilder = productsBuilder