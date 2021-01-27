// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { requestForCategoty } = require("./api/Category-research-request-api");
const { categoryResearchGetRead } = require("./controllers/Category-research-get-ready");

const { requestForProductAnalysis } = require("./api/Product-analysis-request-api");
const { ProductAnalysisGetReadyResults } = require("./controllers/Product-analysis-get-ready");

const {csvWriter} = require("./services/Csv-writer")

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

   /* fetch result */
    const FAKECategoryResultWorker = [{
      id: 14284837011,
      requestId: '9d478491-5f98-4554-88d1-2306f0458dc4',
      numberOfResultAskFor: 8
    },{
      id: 555555,
      requestId: 'e35c1dbd-8a21-484e-871b-6c3ac985987a',
      numberOfResultAskFor: 5
    },{
      id: 14666666,
      requestId: 'b2e32e0c-4e18-447f-8d2b-cb58b314f4ba',
      numberOfResultAskFor: 5
    }]; 
    
    /* 3) Save Workers List/Queue (should save to db or files) */
    const whatisit = await csvWriter(FAKECategoryResultWorker, "./db/worker-list.csv") // return true when finished

   

    /* 4) *** API Category Research API GET: ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
    //whatisit ? "keep going" : "didnt write";
    const requestIdResultsArr = await categoryResearchGetRead();
       


   /* 3) update DB */
     //console.log("updateDB", requestIdResultsArr)
    

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

