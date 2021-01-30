const { categoryResearchApi } = require("../api/category-research-api");
const { csvWriter } = require("../services/csv-writer");
const { workerBuilder } = require("../services/worker-builder");
let whileLoopDevCounter = 1;


async function categoryResearchController(inputArr, pathWorkersDb) {
  console.log("category controller",pathWorkersDb)
  // let ready = false;
  try {
    /* Call API*/
    //let requestIdsArr = await categoryResearchApi(inputArr, pathWorkersDb);

    let FAKERequestIdsArr = [
      {
        requestId: "648180e7-d60a-4c1d-8d65-196c2cb88da9",
        categoryId: 2975359011,
        numberOfResultAskFor: 2,
        ProgressStatus: 1,
      },
      {
        requestId: "bc79075b-cee8-4555-82e1-ad89f88d32d4",
        categoryId: 2975359011,
        numberOfResultAskFor: 5,
        ProgressStatus: 1,
      },
    ];
  
    //will check if exists and if not, will write to db
    let workers = await workerBuilder(FAKERequestIdsArr/*requestIdsArr*/,pathWorkersDb); 
  } catch (err) {
    console.log("Error runProcess - category research get ready");
    console.log("Error runProcess" + err);
  }
  return "saved";
}

module.exports.categoryResearchController = categoryResearchController;
