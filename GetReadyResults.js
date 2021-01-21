const { CategorygetReadyResultsApi } = require("./CategortGetReadyApiCall");

async function getReadyResults(exampleResponsetObj) {
    // API GET /category/analysisAsync
    // make call (queries)
    // get "requestId"
    let counter = 1;
    
    try {
  
      const allApiCallResults = await CategorygetReadyResultsApi(Math.ceil(exampleResponsetObj["items"]/10));
      
      console.log()
      for (let i = 0; i < allApiCallResults.length; i++) {
        // get the job process status
        let readyForFetchStatus = allApiCallResults[i].data.asyncApiStatus.jobsStatus // check if true (asyncApiStatus.jobsStatus.requestID."jobResultsReadyForFetch": true)
        let ApiCallResults = allApiCallResults[i].data.result;
        readyForFetchStatus ? ApiCallResults : console.log("Jobs processing is empty");
        for (let j = 0; j < ApiCallResults.length; j++) {
          console.log(counter + ") " + ApiCallResults[j].result.title);
          counter++;
        }
      }
    } catch (err) {
      console.log("Error runProcess" + err);
    }
  }


  module.exports.getReadyResults = getReadyResults;