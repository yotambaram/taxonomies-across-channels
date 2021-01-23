// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { requestForCategoty } = require("./Category-research-request-api");
const { categortGetReadyResults } = require("./Category-research-get-ready");

const { requestForProductAnalysis } = require("./Product-analysis-request-api");
const { ProductAnalysisGetReadyResults } = require("./Product-analysis-get-ready");

// Using for .env file to add API ID and KEY.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function app() {
  try {
    /* 1) GET INPUT ID NUMBERS */
    const FAKEINPUT = [{id: 14284837011, numberOfResults: 4},]
    /* 2) API Category Research API GET: /searchAsync -> Returns market research data regarding an item. */
    const requestIdsArr = await requestForCategoty(FAKEINPUT);
    console.log(requestIdsArr)
    //fetch

    /* *** API Category Research API GET: ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
    // const requestIdResultsArr = await categortGetReadyResults(
    //   /*responsetObj*/ exampleResponsetObj
    // );

    /* *** API Product Analysis API GET: /searchAsync -> Returns market research data regarding an item.*/
    // const requestsIdArr = await (requestForProductAnalysis(/*requestIdResultsArr*/)); //<- obj with request id and how many result requested
    // console.log(requestsIdArr)


    /* *** API Product Analysis API GET: ​/searchAsync/getReadyResults -> Returns markets research data regarding on item*/
    // const requestIdResultsArr = await ProductAnalysisGetReadyResults(
    //    /*requestsIdArr*/
    // );
    //console.log(requestIdResultsArr)

    //////////
  } catch (err) {
    console.log("Error runProcess" + err);
  }
}



app();

