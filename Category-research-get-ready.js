const { CategoryGetReadyResultsApi } = require("./Category-research-ready-api-request");
const {csvReader} = require("./CsvReader")



async function categortGetReadyResults() {
  const query = "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";
  const resultIDs = [];
  try {
    /* Get worker list from DB / file */
    let workersDB = await csvReader()
    /* Call API*/
    const allApiCallResults = await CategoryGetReadyResultsApi(query);
    
    // TODO: extract class out
    class Item {
      constructor(requestId, browseNodeId, numberOfResultAskedFor) {
        this.requestId = requestId;
        this.browseNodeId = browseNodeId;
        this.numberOfResultAskedFor = numberOfResultAskedFor
        this.resultAid = new Array;
      }

      pushToResult(aid){
        this.resultAid.push(aid)
      }
    }
  
    // get values to save
    let dataResultsArr = allApiCallResults[0].data.result;
    let responeRequestId = dataResultsArr[0].requestId;
    let browseNodeId = "";
    let numberOfResultAskedFor = 0;
    //console.log("dataResultsArr" + dataResultsArr)

 
      for(let i = 0; i < workersDB.length; i++) {
        console.log(workersDB[i].requestId , responeRequestId)
        if(workersDB[i].requestId === responeRequestId) {
          browseNodeId = workersDB[i].id;
          numberOfResultAskedFor = workersDB[i].numberOfResultAskFor;
        }

      }
    

    // Build the class
    let items = new Item(responeRequestId, browseNodeId, numberOfResultAskedFor)
    for (let i = 0; i < dataResultsArr.length; i++) {     
      items.pushToResult(dataResultsArr[i].result.aid)
    }
    console.log(items)
    

    // X add data to list\queue
    //console.log(allApiCallResults[0].data.asyncApiStatus.jobsStatus);

   // let currentJobsStatus = allApiCallResults[0].data.asyncApiStatus.jobsStatus[
    //    worker.requestId
    //  ];
    // If there are no jobs
   // !currentJobsStatus
   //   ? /* remove requestId from queue */ (newDataExample.localFetched = true)
    //  : "";

   // let ProgressingDone = currentJobsStatus.ProgressStatus === "DONE";
   // let fetchDone = currentJobsStatus.jobResultsReadyForFetch === true;
    // If list\queue is not empty, keep progress. alse, stop working here
    //!ProgressingDone || ProgressingDone && fetchDone ? categortGetReadyResults(workerList) : /* remove it from queue */newDataExample.localFetched = true;
  } catch (err) {
    console.log("Error runProcess" + err);
  }
  return resultIDs;
}

module.exports.categortGetReadyResults = categortGetReadyResults;
