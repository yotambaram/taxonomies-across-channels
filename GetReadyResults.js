const { CategorygetReadyResultsApi } = require("./CategortGetReadyApiCall");

async function getReadyResults(exampleResponsetObj) {
    // API GET /category/analysisAsync
    // make call (queries)
    // get "requestId"
    let counter = 1;
    const resultIDs = [];
    try {
      let timesToCall = Math.ceil(exampleResponsetObj["items"]/10)
      const allApiCallResults = await CategorygetReadyResultsApi(timesToCall);
      for (let i = 0; i < allApiCallResults.length; i++) { 
        // get the job process status
        let readyForFetchStatus = allApiCallResults[i].data.asyncApiStatus.jobsStatus // check if true (asyncApiStatus.jobsStatus.requestID."jobResultsReadyForFetch": true)
        let ApiCallResults = allApiCallResults[i].data.result;
        readyForFetchStatus ? ApiCallResults : console.log("Jobs processing is empty");
        for (let j = 0; j < ApiCallResults.length; j++) {
          console.log(counter + ") " + ApiCallResults[j].result.aid);
          resultIDs.push(ApiCallResults[j].result.aid)
         // console.log(resultIDs)
          counter++; 
        }
      }
    } catch (err) {
      console.log("Error runProcess" + err);
    }
    console.log(resultIDs)
  }


  module.exports.getReadyResults = getReadyResults;