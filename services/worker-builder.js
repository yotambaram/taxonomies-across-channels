const {
  categoryResearchController,
} = require("../controllers/category-research-controller");
const Worker = require("../models/Worker");
const { csvReader } = require("./csv-reader");
const { csvWriter } = require("./csv-writer");

async function workerBuilder(dataResultsArr, pathWorkersDb) {
  try {
    // Get worker DB (with sql it can be get worker where workersDB[i].requestId === currentRequestId)
    let workersDB = await csvReader(pathWorkersDb);
    if (workersDB) {
      console.log("workersDB", true);
      // if exist, check if req exsits
      console.log(workersDB)
      console.log(dataResultsArr)
      for (let i = 0; i < workersDB.length; i++) {
        console.log(dataResultsArr["requestId"], "=?", workersDB[i].requestId)
        if (dataResultsArr.includes(workersDB[i].requestId)) {
          // not to itirair both &^^%&%^&%^&%^&%^&%^&%^&%
          // ^%&%^&%^&%^&%^
          console.log("not include");
          let headers = Object.keys(newRequestsFilteredList[0]);
          csvWriter(newRequestsFilteredList, pathWorkersDb, headers);
        } else {
        }
      }
    } else {
      // write it
      let headers = Object.keys(dataResultsArr[0]);
      csvWriter(dataResultsArr, pathWorkersDb, headers); // csvWriter = (data, filePath, fields)
    }
    //console.log(workersDB)
    //console.log("product-builder workersDB",workersDB)

    // if(workersDB[i].requestId === currentRequestId)
    // let currentRequestId = dataResults.result[0].requestId;
    // let currentBrowseNodeId;
    // let currwntNumberOfResultAskedFor;
    // for(let i = 0; i < workersDB.length; i++) {
    //   if(workersDB[i].requestId === currentRequestId) { //if workerDB will be obj, i wont iterate it each time to find the data
    //     currentBrowseNodeId = workersDB[i].id;
    //     currwntNumberOfResultAskedFor = workersDB[i].numberOfResultAskFor;
    //   }
    // }
    // ProductsArr = [];
    // for (let i = 0; i < dataResults.result.length; i++) {
    //   resultAid = dataResults.result[i].result.aid
    //   let newProduct = new Worker(currentRequestId, currentBrowseNodeId, currwntNumberOfResultAskedFor, resultAid)
    //   ProductsArr.push(newProduct)
    // }
  } catch {
    console.log("ERROR workerBuilder");
  }

  //return ProductsArr
}

module.exports.workerBuilder = workerBuilder;
