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
  myWordersList = []

  try {
    /* 1) GET INPUT ID NUMBERS */
    const FAKEInput = [{id: 14284837011, numberOfResults: 7}, {id: 14284832011, numberOfResults: 13}]
    /* 2) API Category Research API GET: /searchAsync -> Returns market research data regarding an item. */
    //const requestIdsArr = await requestForCategoty(FAKEINPUT);

    //fetch
    const FAKECategoryResultWorker = {
      "browseNodeId": 6358540011,
      "resultRequested": 30,
      "requestId": "082c71cc-f980-4bda-bb8c-91230454ecb6"
   }

   // Put workers in List/Queue
   
   myWordersList.push(FAKECategoryResultWorker)
    /* 3) *** API Category Research API GET: ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
    const requestIdResultsArr = await categortGetReadyResults(
      /*responsetObj*/ FAKECATEGORYREQUESTID
    );
      console.log(requestIdResultsArr[0])
    /* 4) *** API Product Analysis API GET: /searchAsync -> Returns market research data regarding an item.*/
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

