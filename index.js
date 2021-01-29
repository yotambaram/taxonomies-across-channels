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
const pathWorkersDb = "./db/worker-list.csv";
  const pathCategotyDb = "./db/category-db.csv";

const categoryGetResultquery =
    "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";
   
// Using for .env file to add API ID and KEY.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function app() {
  myWordersList = []
  let dbCreatorr = false;

  try {
    /* 1) GET INPUT ID NUMBERS */
    //const input = [{id: 2975359011, numberOfResults: 92},{id: 2975359011, numberOfResults: 91}]

    /* 2) API Category Research GET: /searchAsync -> Returns market research data regarding an item. */
    //const requestIdsArr = await requestForCategoty(input);

   /* fetch result */
    const FAKECategoryResultWorker = [{
      
      requestId: "f32ec813-955e-44f9-9b9c-7fcdc772d157",
      id: 14284837011,
      numberOfResultAskFor: 33,
      ProgressStatus: 1
    },{
      
      requestId: "c94aa812-7b75-49cc-95d7-039992b9d4c8",
      id: 98674554234,
      numberOfResultAskFor: 22,
      ProgressStatus: 1
    },{
      
      requestId: "907bf10f-4ee7-4766-9749-81372d69e724",
      id: 7567567566,
      numberOfResultAskFor: 114,
      ProgressStatus: 1
    },{
      requestId: "be56af30-3666-4379-b878-3e30c29f1814",
      id: 5234636546,
      numberOfResultAskFor: 44,
      ProgressStatus: 1
    }]; 
    


    /* 3) Save Workers List/Queue (should save to db or files) */
    dbCreated = await dbCreator(FAKECategoryResultWorker, pathWorkersDb)
    console.log("dbCreated is "+ dbCreated)

    // timeout few min when processing (1000 * 60 * 5)
    setTimeout(myFunc, 1000, 'funky'); 
    /* 4) *** API Category Research API GET: ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
    //whatisit ? "keep going" : "didnt write";
    async function myFunc(arg){
      const getReadyResultsArr = await categoryResearchGetRead(categoryGetResultquery);
         console.log("requestIdResultsArr", getReadyResultsArr)
    }

    
       


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

