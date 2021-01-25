const {
  CategoryGetReadyResultsApi,
} = require("./Category-research-ready-api-request");




let counter = 0;

async function categortGetReadyResults(exampleResponsetObj) {

  counter++
  const resultIDs = [];
  try {
    //api call
      const allApiCallResults = await CategoryGetReadyResultsApi(
        exampleResponsetObj
      );
      
      // then: Save allApiCallResults data (constractor) -> allApiCallResults[0].data.result[]
          let newDataExample = {
            requestId: "082c71cc-f980-4bda-bb8c-91230454ecb6",
            aid: ["AID9XWB81001"],
            browseNodeId: "6358540011",
            localFetchedone: false
          };

          for (let i = 0; i < allApiCallResults.length; i++) {
            // get the job process status
            let readyForFetchStatus = allApiCallResults[i].data.asyncApiStatus.jobsStatus // check if true (asyncApiStatus.jobsStatus.requestID."jobResultsReadyForFetch": true)
            let ApiCallResults = allApiCallResults[i].data.result;
            readyForFetchStatus ? ApiCallResults : console.log("Jobs processing is empty");
            for (let j = 0; j < ApiCallResults.length; j++) {
              //console.log(counter + ") " + ApiCallResults[j].result.aid);
              resultIDs.push(ApiCallResults[j].result.aid)
              counter++;
            }
          }

      // X add data to list\queue
      console.log(allApiCallResults[0].data.asyncApiStatus.jobsStatus)
      let currentJobsStatus = allApiCallResults[0].data.asyncApiStatus.jobsStatus[exampleResponsetObj.requestId]
      // If there are no jobs
      !currentJobsStatus ? /* remove it from queue */newDataExample.localFetched = true : "";

      let ProgressingDone = currentJobsStatus.ProgressStatus === "DONE"
      let fetchDone = currentJobsStatus.jobResultsReadyForFetch === "false"
      // If list\queue is not empty, keep progress. alse, stop working here
    //  !ProgressingDone || ProgressingDone && !fetchDone ? categortGetReadyResults(exampleResponsetObj) : /* remove it from queue */newDataExample.localFetched = true;
     

    
  } catch (err) {
    console.log("Error runProcess" + err);
  }
  //console.log(resultIDs)
  console.log(counter)
  return resultIDs;
}

module.exports.categortGetReadyResults = categortGetReadyResults;
