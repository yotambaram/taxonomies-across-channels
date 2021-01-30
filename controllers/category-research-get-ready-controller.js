const {
  categoryGetReadyResultsApi,
} = require("../api/category-research-getready-api");
const { processTimeout } = require("../services/process-timeouter");
const { productsBuilder } = require("../services/product-builder");
const { dbCreator } = require("../services/db-creator");
// const { forEach } = require("lodash");
const { statusChecker } = require("../services/status-checker");

let whileLoopDevCounter = 1;






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
    while (jobsProcessing && whileLoopDevCounter < 150|| howManyResults > 0 && whileLoopDevCounter < 150|| jobsStatus && whileLoopDevCounter <150) {
      console.log("While" + whileLoopDevCounter)
      // If there are results,  and  and call the api again
      if(howManyResults > 0) {
        // Build new pruducts
        const productsArr = await productsBuilder(apiDataResult, pathWorkersDb);
        // save pruducts to DB
        dbCreator(productsArr, pathCategotyDb);
        // Call the api again to get new result
        allApiCallResults = await categoryGetReadyResultsApi(query);
        
      } 
      // Else if jobStaus is still have data or still processing new jobs
      else if (jobsStatus === true || jobsProcessing === true) {
        // Wait X time and call api again.
        setTimeout(processTimeout, 1000 * 5, allApiCallResults = await categoryGetReadyResultsApi(query))
      }
       whileLoopDevCounter++;
    }

    console.log("No more results in Category Ready Reasult API or *COUNTER finished*...")

  } catch (err) {
    console.log("Error runProcess - category research get ready");
    console.log("Error runProcess" + err);
  }
  return "saved";
}

module.exports.categoryResearchGetRead = categoryResearchGetRead;
