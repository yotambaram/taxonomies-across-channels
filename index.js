// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { requestForCategoty } = require("./RequestForCategoty");
const { getReadyResults } = require("./GetReadyResults");

// Using for .env file to add API ID and KEY.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function app() {
  try {
    // API GET: /searchAsync -> Returns market research data regarding an item.
    //const responsetObj = await requestForCategoty(); //<- obj with request id and how many result requested
    let exampleResponsetObj = {"requestId": "c973be46-90f7-4171-b9e0-b963617170e1", "items": 200}
{
    // check if requestID "jobResultsReadyForFetch": true
        //   get "requestId" "requestId": "52a101e1-6872-4fa6-88d8-a352474a8033",
        //   "asyncApiStatus": {
        //       "jobsStatus": {
        //           "requestId": { // <- when this is the idRequest from the get category
        //               "ProgressStatus": "IN_PROGRESS"/"DONE",
        //               "jobResultsReadyForFetch": true // <- if true start with get ready}

    // IF TRUE, CALL GER READY with how many times (category:maxItems/10 times)
  }
    // API GET: ​/category​/analysisAsync​/getReadyResults
   // fetch
    const categotyRequestObj = await getReadyResults(exampleResponsetObj)

    //console.log(requestObj)
  } catch (err) {
    console.log("Error runProcess" + err);
  }
}
//////////////

// async function productAnalysisAPI() {}

app();
// productAnalysisAPI();
