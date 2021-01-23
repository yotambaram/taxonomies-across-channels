const { CategorygetReadyResultsApi } = require("./Category-research-ready-api-request");

async function categortGetReadyResults(exampleResponsetObj) {

    let counter = 1;
    const resultIDs = [];
    try {
      //api call
      const allApiCallResults = await CategorygetReadyResultsApi(exampleResponsetObj);
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
    } catch (err) {
      console.log("Error runProcess" + err);
    }
    //console.log(resultIDs)
    return resultIDs
  }


  module.exports.categortGetReadyResults = categortGetReadyResults;