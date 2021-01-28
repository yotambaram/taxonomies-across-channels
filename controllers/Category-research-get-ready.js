const {
  CategoryGetReadyResultsApi,
} = require("../api/Category-research-ready-api-request");
const { csvReader } = require("../services/Csv-reader");
const { csvWriter } = require("../services/Csv-writer");
const { NewItemBuilder } = require("../services/db-Item-builder");

//if exist: update DB by add aid to array

const updateLine = (index, allApiCallResults, categoryDB) => {
  let apiResult = allApiCallResults[0].data.result;
  // Update DB resultAId
  
  let newItemsArr = [];
  console.log
  let dbResultAidArr = JSON.parse(categoryDB[index].resultAId);

  //console.log("dbResultAidArr",dbResultAidArr)
  // Put new aid results in array
  for (let i = 0; i < apiResult.length; i++) {
    newItemsArr.push(apiResult[i].result.aid);
  }
  // Merge old array with New array

  
  let concatArr = dbResultAidArr.concat(newItemsArr);
  //console.log("concatArr", concatArr);
  categoryDB[index].resultAId = JSON.stringify(concatArr);
 
  //console.log("updateLine",categoryDB)
  return categoryDB;
  //write the update to DB
};

async function createLine(allApiCallResults, categoryDB, pathWorkers) {
  console.log("Creating line");
  // create new
  let newRequestIdItem = await NewItemBuilder(allApiCallResults, pathWorkers);
  // write to db
  categoryDB[categoryDB.length] = JSON.parse(JSON.stringify(newRequestIdItem));
  
  return categoryDB;
}

async function categoryResearchGetRead() {
  let ready = false;
  let devCounter = 0;
  const pathDb = "./db/Category-db.csv";
  const pathWorkers = "./db/worker-list.csv";
  const query =
    "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";

  let categoryDB = await csvReader(pathDb);

  async function getReadHelper(categoryDB) {
    devCounter++;
    try {
      /* Call API*/
      const allApiCallResults = await CategoryGetReadyResultsApi(query);
     // console.log(allApiCallResults[0].data.result[0].requestId)
      if(allApiCallResults[0].data.result[0].requestId) {
        if (categoryDB.length === 0 || !categoryDB) {
          console.log("NO DB");
          // create new data obj
          categoryDB = await createLine(
            allApiCallResults,
            categoryDB,
            pathWorkers
          );
  
          //return categoryDB;
        } else {
          // Check if current request id exists in DB
          //console.log("TEST",allApiCallResults[0].data.result[0].requestId)
          let currentRequestId = allApiCallResults[0].data.result[0].requestId;
          let index = -1;
          for (let i = 0; i < categoryDB.length; i++) {
            if (currentRequestId === categoryDB[i].requestId) {
              index = i;
              break;
            }
          }
          // If exsits, Update, else Create new line
          index > -1
            ? (categoryDB = await updateLine(
                index,
                allApiCallResults,
                categoryDB
              ))
            : (categoryDB = await createLine(
                allApiCallResults,
                categoryDB,
                pathWorkers
              ));
        }
       
        let currentJobsStatus = allApiCallResults[0].data.asyncApiStatus;
        //   //   //If there are no jobs
        //     !currentJobsStatus
        //       ? /* remove requestId from queue */ (newDataExample.localFetched = true)
        //      : "";
        let ProgressingDone = currentJobsStatus.ProgressStatus === "DONE";
        let fetchDone = currentJobsStatus.jobResultsReadyForFetch === true;
        //If list\queue is not empty, keep progress. alse, stop working here
        console.log("One should be TRUE: ",(!ProgressingDone), (ProgressingDone && fetchDone));
        (!ProgressingDone && devCounter < 150) ||
        (ProgressingDone && fetchDone && devCounter < 150)
          ? getReadHelper(categoryDB)
          : ready = await csvWriter(
              categoryDB,
              pathDb
            ); /* +remove it from worker-list */

      } else {
        
        ready = await csvWriter
          return ready
        

      }
       
      



          
          
    } catch (err) {
      console.log("Error runProcess" + err);
    }
    
    
    
  }
  
  let dataPrited = await (getReadHelper(categoryDB))
  console.log("Fsdfsdfsd",dataPrited)
  return
}

module.exports.categoryResearchGetRead = categoryResearchGetRead;
