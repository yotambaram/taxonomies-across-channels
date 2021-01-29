const {
  categoryGetReadyResultsApi,
} = require("../api/category-research-ready-api-request");

const { productBuilder } = require("../services/product-builder");
const { dbCreator } = require("../services/db-creator");
// const { forEach } = require("lodash");
const { statusChecker } = require("../services/status-checker");

let whileLoopDevCounter = 1;

const pathWorkersDb = "./db/worker-list.csv";
  const pathCategotyDb = "./db/category-db.csv";

async function categoryResearchGetRead(query) {
  // let ready = false;

  try {
    /* Call API*/
    let allApiCallResults = await categoryGetReadyResultsApi(query);
    apiDataResult = allApiCallResults[0].data;
    // console.log("EXAMPLE",apiDataResult.result[0])

    // Cases when to stop
    let jobsStatus = statusChecker(apiDataResult.asyncApiStatus.jobsStatus); //Object.keys(apiDataResult.asyncApiStatus.jobsStatus)
    let jobsProcessing = apiDataResult.asyncApiStatus.jobsProcessing;
    let howManyResults = apiDataResult.result.length;

    // While one of the conditions is true, save the result and call the api again.
    while (jobsProcessing && whileLoopDevCounter < 4|| howManyResults > 0 && whileLoopDevCounter < 4|| jobsStatus && whileLoopDevCounter <4) {
      // Build new Items
      console.log("While" + whileLoopDevCounter)
      const productsArr = await productBuilder(apiDataResult, pathWorkersDb, pathCategotyDb);
    
      //save the item to DB
      dbCreator(productsArr, pathCategotyDb);


      // Call API again if there are more resuts to work on
      if (howManyResults > 0) {
        console.log("you have more results to work on")
        allApiCallResults = await categoryGetReadyResultsApi(query);
        // allApiCallResults = await categoryGetReadyResultsApi(query);
      // Or if jobStaus is true or job jobs processing
      } else if (jobsStatus || jobsProcessing === true) {
        console.log("the are no result but its processing new ones")
        // timeout and then call
        allApiCallResults = await categoryGetReadyResultsApi(query);
        
      }

       whileLoopDevCounter++;
    }
    console.log("NO MORE RESULTS")

  } catch (err) {
    console.log("Error runProcess" + err);
  }

  // }

  // let dataPrited = await (getReadHelper(categoryDB))
  // console.log("Fsdfsdfsd",dataPrited)
  return "saved";
}

module.exports.categoryResearchGetRead = categoryResearchGetRead;
