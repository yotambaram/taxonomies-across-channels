const {categoryGetReadyResultsApi} = require("../api/category-research-getready-api");
const { processTimeout } = require("../services/process-timeouter");
const { productsBuilder } = require("../services/product-builder");
const { dbCreator } = require("../services/db-creator");
const { statusChecker } = require("../services/status-checker");

let whileLoopDevCounter = 1;



async function categoryResearchGetReadyController() {

  let query = "https://api.algopix.com/v3/category/analysisAsync/getReadyResults"
  try {

    /* Call API*/
    let categoryGetReadyApiResult = await categoryGetReadyResultsApi(query);
    let categoryApiData = categoryGetReadyApiResult[0].data;
    
    // Cases when to stop iteration
    //TODO: build a constractor
    let jobsStatus = statusChecker(categoryApiData.asyncApiStatus.jobsStatus); //Object.keys(categoryApiData.asyncApiStatus.jobsStatus)
    let jobsProcessing = categoryApiData.asyncApiStatus.jobsProcessing;
    let currentResults = categoryApiData.result;
    console.log(currentResults.length)

    // While one of the conditions is true, save the result and call the api again.
    while (jobsProcessing && whileLoopDevCounter < 10|| currentResults.length > 0 && whileLoopDevCounter < 10|| jobsStatus && whileLoopDevCounter <10) {
      console.log("While" + whileLoopDevCounter)
      // If there are results
      if(currentResults.length > 0) {
        // Build new pruducts
        const productsArr = await productsBuilder(currentResults);
        // save pruducts to DB
        // dbCreator(productsArr);
        // // Call the api again to get new result
        // categoryGetReadyApiResult = await categoryGetReadyResultsApi(query);
        
      } 
      // Else if jobStaus is still have data or still processing new jobs
      else if (jobsStatus === true || jobsProcessing === true) {
        // Wait X time and call api again.
        setTimeout(processTimeout, 1000 * 5, categoryGetReadyApiResult = await categoryGetReadyResultsApi(query))
      }
       whileLoopDevCounter++;
    }

    console.log("No more results in Category Ready Reasult API or *COUNTER finished*...")

  } catch (err) {
    console.log("Error runProcess - category research get ready controller");
    console.log("Error runProcess" + err);
  }
  return "saved";
}

module.exports.categoryResearchGetReadyController = categoryResearchGetReadyController;
