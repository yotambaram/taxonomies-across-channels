const {
  CategoryGetReadyResultsApi,
} = require("../api/Category-research-ready-api-request");
const { csvReader } = require("../services/Csv-reader");
const { csvWriter } = require("../services/Csv-writer");
const { NewItemBuilder } = require("../services/db-Item-builder");






//if exist: update DB by add aid to array

const updateLine = (index, allApiCallResults, categoryDB) => {
  let apiResult = allApiCallResults[0].data.result
  // Update DB resultAid
  let newItemsArr = [];
  let dbResultAidArr = JSON.parse(
    JSON.stringify(categoryDB[index].resultAid)
  );
  // Put new aid results in array
  for (let i = 0; i < apiResult.length; i++) {
    console.log("Updating");
    newItemsArr.push(apiResult[i].result.aid);
  }
  // Merge old array with New array
  categoryDB[index].resultAid = dbResultAidArr.concat(newItemsArr);

  return categoryDB;
  //write the update to DB
};

async function createLine(allApiCallResults, categoryDB, pathWorkers) {
  console.log("Creating line");
  // create new
  let newRequestId = await NewItemBuilder(allApiCallResults, pathWorkers);
  // write to db
  categoryDB[categoryDB.length] = JSON.parse(JSON.stringify(newRequestId));
  return categoryDB;
}

async function categoryResearchGetRead() {

  let devCounter = 0;
  const pathDb = "./db/Category-db.csv";
  const pathWorkers = "./db/worker-list.csv";
  const query = "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";

  let categoryDB = await csvReader(pathDb);

    async function getReadHelper(categoryDB) {
     
    
      devCounter++;
      try {
        /* Call API*/
        const allApiCallResults = await CategoryGetReadyResultsApi(query);

        allApiCallResults[0].data.result[0].requestId ? console.log("START WORK") : console.log.og("NO RESULTS");
        // If there are no DB data create one
        if (categoryDB.length === 0 || !categoryDB) {
          console.log("NO DB");
          // create new data obj
          categoryDB = await createLine(allApiCallResults, categoryDB, pathWorkers);
          
          //return categoryDB;
        } else {
          // Check if current request id exists in DB
          //console.log("TEST",allApiCallResults[0].data.result[0].requestId)
          let currentRequestId = allApiCallResults[0].data.result[0].requestId;
          let index = -1
          for (let i = 0; i < categoryDB.length; i++) {
            if (currentRequestId === categoryDB[i].requestId) {
              index = i
              break  
            }
          }
          // If exsits, Update, else Create new line
          index > -1 ? categoryDB = await updateLine(index, allApiCallResults, categoryDB) : categoryDB = await createLine(allApiCallResults, categoryDB, pathWorkers);
        }
        
        let currentJobsStatus = allApiCallResults[0].data.asyncApiStatus;
        //   //   //If there are no jobs
        //     !currentJobsStatus
        //       ? /* remove requestId from queue */ (newDataExample.localFetched = true)
        //      : "";
        // let ProgressingDone = currentJobsStatus.ProgressStatus === "DONE";
        // let fetchDone = currentJobsStatus.jobResultsReadyForFetch === true;
        // //If list\queue is not empty, keep progress. alse, stop working here
        // !ProgressingDone || (ProgressingDone && fetchDone)
        //   ? getReadHelper(categoryDB)
        //     : /* remove it from worker-list */ "";
        
      } catch (err) {
        console.log("Error runProcess" + err);
      }
      console.log("done fetching")
      return categoryDB;
    }

  categoryDB = await getReadHelper(categoryDB)
  console.log(categoryDB)
  let ready = await csvWriter(categoryDB, pathDb);
  console.log("printed", ready)
  //return categoryDB;
}

module.exports.categoryResearchGetRead = categoryResearchGetRead;
