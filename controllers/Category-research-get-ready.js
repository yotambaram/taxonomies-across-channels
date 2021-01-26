const {
  CategoryGetReadyResultsApi,
} = require("../api/Category-research-ready-api-request");
const { csvReader } = require("../services/Csv-reader");
const { csvWriter } = require("../services/Csv-writer");
const { NewItemBuilder } = require("../services/db-Item-builder");

const pathDb = "./db/Category-db.csv";
const pathWorkers = "./db/worker-list.csv";

let devCounter = 0;
let categoryDB

//if exist: update DB by add aid to array
const updateLine = (index, allApiCallResults, categoryDB) =>{
  console.log("Updating")
 
 // Update DB resultAid
 let newItemsArr = [];
 // Put new aid results in array
 for (let i = 0; i < allApiCallResults[0].data.result.length; i++) {
   newItemsArr.push(allApiCallResults[0].data.result[i].result.aid);
 
 let dbResultAidArr = JSON.parse(categoryDB[index].resultAid);
 // Merge old array with New array
 categoryDB[index].resultAid = dbResultAidArr.concat(newItemsArr);
 //write the update to DB
 }
 return categoryDB
} 

const createLine = (allApiCallResults, categoryDB) =>{
 console.log("NOT exist");
 // create new
 let newRequestId = NewItemBuilder(allApiCallResults, pathWorkers);
// write to db
return categoryDB[categoryDB.length] = JSON.parse(JSON.stringify(newRequestId));   
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
    
    
    // If there are no DB data create one
    if (categoryDB.length === 0 || !categoryDB) {
      console.log("NO DB");
      // create new data obj
      createLine()
    } 
    else {
      // Check if current request id exists in DB
      let currentRequestId = allApiCallResults[0].data.result[0].requestId;
      let index = -1;
    for (let i = 0; i < categoryDB.length; i++) {
      if (currentRequestId === categoryDB[i].requestId) {
          console.log("FDFDFDFDSFDSFSDFDSFSDFDSFDFDG SDFSDFSDFSD sdfSDFS S SFSD exist in db");
          index = i;
      }
    }
    console.log(index)
    index > -1 ? updateLine(index, allApiCallResults, categoryDB) : createLine(allApiCallResults, categoryDB);
      // Get current request id to work on
      
  }
      
      
      
    
    
    
    

    

  //  let currentJobsStatus = allApiCallResults[0].data.asyncApiStatus;
  //   //   //If there are no jobs
  //     !currentJobsStatus
  //       ? /* remove requestId from queue */ (newDataExample.localFetched = true)
  //      : "";

  //   let ProgressingDone = currentJobsStatus.ProgressStatus === "DONE";
  //   let fetchDone = currentJobsStatus.jobResultsReadyForFetch === true;
  //   //If list\queue is not empty, keep progress. alse, stop working here
  //   (!ProgressingDone && devCounter) ||
  //   (ProgressingDone && fetchDone && devCounter)
  //     ? categoryResearchGetRead()
  //     : /* remove it from worker-list */ "";
  } catch (err) {
    console.log("Error runProcess" + err);
  }
  
  csvWriter(categoryDB, pathDb);
  //return resultIDs;
}

module.exports.categoryResearchGetRead = categoryResearchGetRead;
