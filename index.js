// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { categoryResearchController } = require("./controllers/category-research-controller");
const { categoryResearchGetReadyController } = require("./controllers/category-research-get-ready-controller");
const { ProductAnalysisGetReadyResults } = require("./controllers/product-analysis-get-ready");



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
      { categoryId: 6358540011, numberOfResults: 45 },
      //{ categoryId: 6358540011, numberOfResults: 6 },
    ];
   

    
 
    /* 2) API Category Research /searchAsync -> Returns market research data regarding an item. */
    const categortRequestIdObj = await categoryResearchController(input);
 console.log("categortRequestIdObj",categortRequestIdObj)
    let testcategortRequesrIdObj = {
      '5718ab34-fe60-430c-b822-ff57bfea54fb': { "categoryId": 6358540011 },
      'a029f7af-b7f6-4de5-9c58-eb1b159bd993': { "categoryId": 6358540011 }
    }
    

    /* 3) API Category Get Ready ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
    //whatisit ? "keep going" : "didnt write";
    //const requestIdResultsArr = await categoryResearchGetReadyController(testcategortRequesrIdObj);

    /* 4) update DB */
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
