// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { categoryResearchController } = require("./controllers/category-research-controller");

const { categoryResearchRequestApi } = require("./api/category-research-api");
const {
  categoryResearchGetRead,
} = require("./controllers/category-research-get-ready-controller");

const {
  requestForProductAnalysis,
} = require("./api/product-analysis-request-api");
const {
  ProductAnalysisGetReadyResults,
} = require("./controllers/product-analysis-get-ready");
const { dbCreator } = require("./services/db-creator");


// Using for .env file to add API ID and KEY.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}



async function app() {
  myWordersList = [];

  const workerDbPath = "./db/workes-db.csv";
  const categoryDbPath = "./db/category-db.csv";

  try {
    /* 1) GET INPUT ID NUMBERS */
    const input = [
      { id: 2975359011, numberOfResults: 2 },
      { id: 2975359011, numberOfResults: 5 },
    ];
   
    /* 2) API Category Research GET: /searchAsync -> Returns market research data regarding an item. */
    const reaaaaquestI = await categoryResearchController(input, workerDbPath);

    /* 3) Save Workers List/Queue (should save to db or files) */
 
    //    const whatisit = await csvWriter(FAKECategoryResultWorker, "./db/worker-list.csv") // return true when finished

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
