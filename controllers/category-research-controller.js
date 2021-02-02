const { categoryResearchApiProcessor } = require("../api/category-research-api-processor");
const { csvWriter } = require("../services/csv-writer");
const { workerDbBuilder } = require("../services/worker-db-builder");
let whileLoopDevCounter = 1;


async function categoryResearchController(categortRequesrIdMap) {
    try {

    /* 1) Call API*/
    let workersObjRes = await categoryResearchApiProcessor(categortRequesrIdMap);

    /* 2)  Check if exists and if not, write to db */
    let workers = await workerDbBuilder(workersObjRes);
    //let workers = + writeToCategoryWorkersDB(category-request-id,categoryId)
    return workersObjRes;
  } catch (err) {
    console.log("Error runProcess - category research get ready");
    console.log("Error runProcess" + err);
  }
  return workersObjRes;
}

module.exports.categoryResearchController = categoryResearchController;
