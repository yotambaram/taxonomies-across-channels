// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { requestForProductAnalysis } = require("./Product-analysis-request-api");
const { getReadyResults } = require("./Category-get-ready");

// Using for .env file to add API ID and KEY.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function app() {
  try {

    // *** API Category Research API GET: /searchAsync -> Returns market research data regarding an item.
    //const responsetObj = await requestForCategoty(); //<- obj with request id and how many result requested
    let exampleResponsetObj = {
      requestId: "cec40e77-750e-4094-b9bc-491911bf1e5f",
      items: 4,
    };
    const toDelete = {
      // check if requestID "jobResultsReadyForFetch": true
      //   get "requestId" "requestId": "52a101e1-6872-4fa6-88d8-a352474a8033",
      //   "asyncApiStatus": {
      //       "jobsStatus": {
      //           "requestId": { // <- when this is the idRequest from the get category
      //               "ProgressStatus": "IN_PROGRESS"/"DONE",
      //               "jobResultsReadyForFetch": true // <- if true start with get ready}
      // IF TRUE, CALL GER READY with how many times (category:maxItems/10 times)
    }
    //fetch

    // *** API Category Research API GET: ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.
    // const requestIdResultsArr = await getReadyResults(
    //   /*responsetObj*/ exampleResponsetObj
    // );

    //console.log("requestIdResultsArr index.js arr" + requestIdResultsArr);

    // *** API Product Analysis API GET: /searchAsync -> Returns market research data regarding an item.
    const responsetObj = await (requestForProductAnalysis(/*requestIdResultsArr*/)); //<- obj with request id and how many result requested
    console.log("responsetObj index.js + " + responsetObj)


    //////////
  } catch (err) {
    console.log("Error runProcess" + err);
  }
}



app();

