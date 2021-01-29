// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { requestForCategoty } = require("./api/category-research-request-api");
const { categoryResearchGetRead } = require("./controllers/category-research-get-ready");
const { requestForProductAnalysis } = require("./api/product-analysis-request-api");
const { ProductAnalysisGetReadyResults } = require("./controllers/product-analysis-get-ready");

const {csvWriter} = require("./services/csv-writer");
const {dbCreator} = require("./services/db-creator");

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
    //const requestIdsArr = await requestForCategoty(input);

   /* fetch result */
    const FAKECategoryResultWorker = [{
      
      requestId: "fa7ace37-ba8d-4c9f-aff0-6b73f141e11e",
      id: 14284837011,
      numberOfResultAskFor: 33,
      ProgressStatus: 1
    },{
      
      requestId: '79d1cbe5-4dc3-407d-b205-2422a5c6bdeb',
      id: 98674554234,
      numberOfResultAskFor: 22,
      ProgressStatus: 1
    },{
      
      requestId: 'c3bb6add-1435-45bb-a5bd-08ab48ff2a4f',
      id: 7567567566,
      numberOfResultAskFor: 114,
      ProgressStatus: 1
    },{
      requestId: '5fbf05a5-ddc6-493b-9ad7-77ac94594bfff7f',
      id: 5234636546,
      numberOfResultAskFor: 44,
      ProgressStatus: 1
    }]; 
    


    /* 3) Save Workers List/Queue (should save to db or files) */
    const dbCreatorr = await dbCreator(FAKECategoryResultWorker, "./worker-list.csv")
    
    /* 4) *** API Category Research API GET: ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
    //whatisit ? "keep going" : "didnt write";
    //const requestIdResultsArr = await categoryResearchGetRead();
       


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

