
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
      { categoryId: 6358540011, numberOfResults: 100 },
      { categoryId: 6358540011, numberOfResults: 110 },
      { categoryId: 6358540011, numberOfResults: 120 }
    ];
   
    /* 2) API Category Research /searchAsync -> Returns market research data regarding an item. */
    const categortRequestIdArr = await categoryResearchController(input);
   
    /* 3) API Category Get Ready ​/category​/analysisAsync​/getReadyResults -> Get all the ready results.*/
    //const requestIdResultsArr = await categoryResearchGetReadyController(categortRequestIdArr);
    //await new Promise(resolve => setTimeout(resolve, 1000));
    processTimeout2(categoryResearchGetReadyController, categortRequestIdArr, 1000 * 15)

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
