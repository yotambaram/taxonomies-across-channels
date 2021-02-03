const {categoryGetReadyResultsApi} = require("../api/category-research-getready-api");
const { processTimeout2 } = require("../services/process-timeouter");
const { productsBuilder } = require("../services/product-db-builder");
const { dbCreator } = require("../services/db-creator");
const { statusChecker } = require("../services/status-checker");

let whileLoopDevCounter = 1;
//const WorkersDbPath = "../db/category-workers-db.csv"



async function categoryResearchGetReadyController(categortRequestIdsArr) {

  let query = "https://api.algopix.com/v3/category/analysisAsync/getReadyResults"
  try {

    /* Call API*/
    let categoryGetReadyApiResult = await categoryGetReadyResultsApi(query);
    let categoryApiData = categoryGetReadyApiResult[0].data;
    let jobsStatus = statusChecker(categoryApiData.asyncApiStatus.jobsStatus); //Object.keys(categoryApiData.asyncApiStatus.jobsStatus)

    // Cases when to stop iteration
    //TODO: build a constractor
    let jobsProcessing = categoryApiData.asyncApiStatus.jobsProcessing;
    let currentResults = categoryApiData.result;

    // While one of the conditions is true, save the result and call the api again.
    while (jobsProcessing && whileLoopDevCounter < 200|| currentResults.length > 0 && whileLoopDevCounter < 200|| jobsStatus && whileLoopDevCounter <200) {
      console.log("While" + whileLoopDevCounter)
      // If there are results, save them
      if(currentResults.length > 0) {
        // Build new pruducts and save pruducts to DB
        const productsArr = await productsBuilder(currentResults, categortRequestIdsArr);
        // // Call the api again to get new result
        const test = await processTimeout2(categoryGetReadyResultsApi, query, 1000 * 2)

      } 
      // Else if jobStaus is still have data or still processing new jobs
      else if (jobsStatus === true || jobsProcessing === true) {
        // Wait X time and call api again.
        const test2 = await processTimeout2(categoryGetReadyResultsApi, query, 1000 * 20)
      }
     // jobsStatus = statusChecker(categoryApiData.asyncApiStatus.jobsStatus)
       whileLoopDevCounter++;
    }

    console.log("No more results in Category Ready Reasult API or *COUNTER finished*...")
    return categoryApiData;
  } catch (err) {
    console.log("Error runProcess - category research get ready controller");
    console.log("Error runProcess" + err);
  }
  
}

module.exports.categoryResearchGetReadyController = categoryResearchGetReadyController;
