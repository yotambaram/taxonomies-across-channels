const {
  CategoryGetReadyResultsApi,
} = require("../api/category-research-ready-api-request");

const { productBuilder } = require("../services/product-builder");
const { dbCreator } = require("../services/db-creator");
const { forEach } = require("lodash");
const { statusChecker } = require("../services/status-checker");




async function categoryResearchGetRead() {
  let ready = false;

  const pathWorkersDb = "./db/worker-list.csv";
  const pathCategotyDb = "./db/category-db copy.csv";
  const query =
    "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";

  // let categoryDB = await csvReader(pathDb);

  try {
    /* Call API*/
    const allApiCallResults = await CategoryGetReadyResultsApi(query);
    apiDataResut = allApiCallResults[0].data;
    //console.log(apiDataResut)

    //cases when to stop
    let jobsStatus = statusChecker(apiDataResut.asyncApiStatus.jobsStatus); //Object.keys(apiDataResut.asyncApiStatus.jobsStatus)
    let jobsProcessing = apiDataResut.asyncApiStatus.jobsProcessing;
    let howManyResults = apiDataResut.result.length;
    let whileLoopDevCounter = 1;
    console.log(
      "jobsStatus:",
      jobsStatus,
      "jobsProcessing:",
      jobsProcessing,
      "howManyResults: ",
      howManyResults
    );

    // While one of the conditions is true, save the result and call the api again.
    while (
      (jobsProcessing && whileLoopDevCounter <= 2) ||
      (howManyResults > 0 && whileLoopDevCounter <= 2) ||
      whileLoopDevCounter <= 2
    ) {
      // Build new Items
      const productsArr = await productBuilder(apiDataResut, pathWorkersDb);

      //save the item to DB
      let addToDb = dbCreator(productsArr, pathCategotyDb);

      // then call the readyresult api again
      if (jobsStatus === 0 && jobsProcessing === true) {
        // time out and then call
      }
      if (jobsStatus === 0 && jobsProcessing === true) {
        // time out and then call
      }
      if (howManyResults < 1) {
        // time out and then call
      }

      //console.log(whileLoopDevCounter, addToDb)
      //firstRequestId = await CategoryGetReadyResultsApi(query);
      whileLoopDevCounter++;
    }

    //         //return categoryDB;
    //       } else {
    //         // Check if current request id exists in DB
    //         //console.log("TEST",allApiCallResults[0].data.result[0].requestId)
    //         let currentRequestId = allApiCallResults[0].data.result[0].requestId;
    //         let index = -1;
    //         for (let i = 0; i < categoryDB.length; i++) {
    //           if (currentRequestId === categoryDB[i].requestId) {
    //             index = i;
    //             break;
    //           }
    //         }
    //         // If exsits, Update, else Create new line
    //         index > -1
    //           ? (categoryDB = await updateLine(
    //               index,
    //               allApiCallResults,
    //               categoryDB
    //             ))
    //           : (categoryDB = await createLine(
    //               allApiCallResults,
    //               categoryDB,
    //               pathWorkersDb
    //             ));
    //       }

    //       let currentJobsStatus = allApiCallResults[0].data.asyncApiStatus;
    //       //   //   //If there are no jobs
    //       //     !currentJobsStatus
    //       //       ? /* remove requestId from queue */ (newDataExample.localFetched = true)
    //       //      : "";
    //       let ProgressingDone = currentJobsStatus.ProgressStatus === "DONE";
    //       let fetchDone = currentJobsStatus.jobResultsReadyForFetch === true;
    //       //If list\queue is not empty, keep progress. alse, stop working here
    //       console.log("One should be TRUE: ",(!ProgressingDone), (ProgressingDone && fetchDone));
    //       (!ProgressingDone && devCounter < 150) ||
    //       (ProgressingDone && fetchDone && devCounter < 150)
    //         ? getReadHelper(categoryDB)
    //         : ready = await csvWriter(
    //             categoryDB,
    //             pathDb
    //           ); /* +remove it from worker-list */

    //     } else {

    //       ready = await csvWriter
    //         return ready

    //     }
  } catch (err) {
    console.log("Error runProcess" + err);
  }

  // }

  // let dataPrited = await (getReadHelper(categoryDB))
  // console.log("Fsdfsdfsd",dataPrited)
  return;
}

module.exports.categoryResearchGetRead = categoryResearchGetRead;
