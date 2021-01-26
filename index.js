// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { requestForCategoty } = require("./Category-research-request-api");
const { categortGetReadyResults } = require("./Category-research-get-ready");

const { requestForProductAnalysis } = require("./Product-analysis-request-api");
const { ProductAnalysisGetReadyResults } = require("./Product-analysis-get-ready");

const csvW = require("./Csv-writer");

// Using for .env file to add API ID and KEY.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function app() {
  myWordersList = []

  try {
    /* 1) GET INPUT ID NUMBERS */
    //const input = [{id: 2975359011, numberOfResults: 92},{id: 2975359011, numberOfResults: 91}]


    /* 2) API Category Research GET: /searchAsync -> Returns market research data regarding an item. */
    // const requestIdsArr = await requestForCategoty(input);
    // console.log(requestIdsArr)
   /* fetch result
    const FAKECategoryResultWorker = [{
      'id: ': 14284837011,
      requestId: '3cd6027b-3c3b-40db-869c-00975c148791',
      numberOfResultAskFor: 8
    },{
      'id: ': 555555,
      requestId: 'fsdfdsfsdfsd3ciuyiuyiuyiuyiyuiuy',
      numberOfResultAskFor: 5
    },{
      'id: ': 14666666,
      requestId: 'ccsd60hfghfghfghfghfghfghfghfg1',
      numberOfResultAskFor: 5
    }]; */
    
    /* 3) Save Workers List/Queue (should save to db or files) */
    //const whatisit = await csvW.csvWriter(requestIdsArr) // return true when finished

   

    /* 4) *** API Category Research API GET: ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
    //whatisit ? "keep going" : "didnt write";
    const requestIdResultsArr = await categortGetReadyResults();
     //  console.log(requestIdResultsArr)

    /* 5) *** API Product Analysis API GET: /searchAsync -> Returns market research data regarding an item.*/
    // const requestsIdArr = await (requestForProductAnalysis(/*requestIdResultsArr*/)); //<- obj with request id and how many result requested
    // console.log(requestsIdArr)


    /* 6) *** API Product Analysis API GET: ​/searchAsync/getReadyResults -> Returns markets research data regarding on item*/
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

