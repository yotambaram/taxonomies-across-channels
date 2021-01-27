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
      requestId: "10a5cf6e-93ea-44fa-a96e-1f2bcc8c1a52",
      numberOfResultAskFor: 33
    },{
      id: 98674554234,
      requestId: 'e01e7495-e2e9-41c6-bf60-41ba1c168cad',
      numberOfResultAskFor: 22
    },{
      id: 7567567566,
      requestId: 'e01e7495-e2e9-41c6-bf60-41ba1c168cad',
      numberOfResultAskFor: 11
    },{
      id: 5234636546,
      requestId: '4e02f465-1b90-41fb-aae2-60a219a88a9a',
      numberOfResultAskFor: 44
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

