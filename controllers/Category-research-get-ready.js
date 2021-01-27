const {
  CategoryGetReadyResultsApi,
} = require("../api/Category-research-ready-api-request");
const { csvReader } = require("../services/Csv-reader");
const { csvWriter } = require("../services/Csv-writer");
const { NewItemBuilder } = require("../services/db-Item-builder");

const pathDb = "./db/Category-db.csv";
const pathWorkers = "./db/worker-list.csv";

let devCounter = 0;
let categoryDB;

//if exist: update DB by add aid to array
const updateLine = (index, allApiCallResults, categoryDB) => {
  console.log("Updating");
  // Update DB resultAid
  let newItemsArr = [];
  // Put new aid results in array
  for (let i = 0; i < allApiCallResults[0].data.result.length; i++) {
    newItemsArr.push(allApiCallResults[0].data.result[i].result.aid);
    let dbResultAidArr = JSON.parse(
      JSON.stringify(categoryDB[index].resultAid)
    );
    // Merge old array with New array
    categoryDB[index].resultAid = dbResultAidArr.concat(newItemsArr);
    //write the update to DB
  }
  return categoryDB;
};

async function createLine(allApiCallResults, categoryDB) {
  console.log("Creating line");
  // create new
  let newRequestId = await NewItemBuilder(allApiCallResults, pathWorkers);
  // write to db

  categoryDB[categoryDB.length] = JSON.parse(JSON.stringify(newRequestId));
  return categoryDB;
}

async function categoryResearchGetRead() {
  devCounter++;
  const query =
    "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";
  try {
    /* Call API*/
    const allApiCallResults = await CategoryGetReadyResultsApi(query);

    // Get DB data
    categoryDB = await csvReader(pathDb);
    console.log("console.log C-r-g-r categoryDB", categoryDB);

    // If there are no DB data create one
    if (categoryDB.length === 0 || !categoryDB) {
      console.log("NO DB");
      // create new data obj
      categoryDB = await createLine(allApiCallResults, categoryDB);
      return categoryDB;
    } else {
      // Check if current request id exists in DB
      let currentRequestId = allApiCallResults[0].data.result[0].requestId;
      for (let i = 0; i < categoryDB.length; i++) {
        if (currentRequestId === categoryDB[i].requestId) {
          categoryDB = updateLine(i, allApiCallResults, categoryDB);
         // return categoryDB;
        } else {
          categoryDB = await createLine(allApiCallResults, categoryDB);
          //return categoryDB;
        }
      }
    }
    console.log("FSDFSDFSDFDSDF")
    let ready = await csvWriter(categoryDB, pathDb);
    if (ready) {
      let currentJobsStatus = allApiCallResults[0].data.asyncApiStatus;
      //   //   //If there are no jobs
      //     !currentJobsStatus
      //       ? /* remove requestId from queue */ (newDataExample.localFetched = true)
      //      : "";
      let ProgressingDone = currentJobsStatus.ProgressStatus === "DONE";
      let fetchDone = currentJobsStatus.jobResultsReadyForFetch === true;
      //If list\queue is not empty, keep progress. alse, stop working here
      !ProgressingDone || (ProgressingDone && fetchDone)
        ? categoryResearchGetRead()
        : /* remove it from worker-list */ "";
    }
  } catch (err) {
    console.log("Error runProcess" + err);
  }
  console.log("csvWriter(categoryDB, pathDb);", categoryDB);
  csvWriter(categoryDB, pathDb);
  //return resultIDs;
}

module.exports.categoryResearchGetRead = categoryResearchGetRead;
