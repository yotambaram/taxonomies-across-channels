
const { processTimeout2 } = require("./services/process-timeouter");
const { categoryResearchController } = require("./controllers/category-research-controller");
const { categoryResearchGetReadyController } = require("./controllers/category-research-get-ready-controller");
const { ProductAnalysisGetReadyResults } = require("./controllers/product-analysis-get-ready");

// Using for .env file to add API ID and KEY.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function app() {

  try {
    /* 1) GET INPUT ID NUMBERS */
    const input = [
      { categoryId: 6358540011, numberOfResults: 21 },
      { categoryId: 6358540011, numberOfResults: 22 }
    ];
   
    /* 2) API Category Research /searchAsync -> Returns market research data regarding an item. */
    const categortRequestIdsArr = await categoryResearchController(input);

    /* 3) API Category Get Ready ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
      processTimeout2(categoryResearchGetReadyController, categortRequestIdsArr, 1000 * 15)

    /* 4) *** API Product Analysis API GET: /searchAsync -> Returns market research data regarding an item.*/
    // const requestsIdArr = await (requestForProductAnalysis(/*requestIdResultsArr*/)); //<- obj with request id and how many result requested
    // console.log(requestsIdArr)

    /* 5) *** API Product Analysis API GET: ​/searchAsync/getReadyResults -> Returns markets research data regarding on item*/
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
