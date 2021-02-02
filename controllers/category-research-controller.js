const { categoryResearchApiProcessor } = require("../api/category-research-api-processor");
const { csvWriter } = require("../services/csv-writer");
const { workerDbBuilder } = require("../services/worker-db-builder");
let whileLoopDevCounter = 1;


async function categoryResearchController(categortRequesrIdArr) {
    try {

    /* 1) Call API*/
    //let workersArrRes = await categoryResearchApiProcessor(categortRequesrIdArr);
    let FAKEworkersArrRes = [
      {
        "categoryRequestID": 'cv23358e-2a17-4e28-9f94-a2e7b038y777',
        "categoryId": 7258540012,
        "processStatus": 1
      },
      {
        "categoryRequestID": 'fb23358e-2a17-4e28-9f94-a2e7b038e555',
        "categoryId": 6358540015,
        "processStatus": 1
      }
    ]
    /* 2)  Check if exists and if not, write to db */
    let workers = await workerDbBuilder(FAKEworkersArrRes);
    //let workers = + writeToCategoryWorkersDB(category-request-id,categoryId)
    return FAKEworkersArrRes;
  } catch (err) {
    console.log("Error runProcess - category research controller");
    console.log("Error runProcess" + err);
  }
 // return workersArrRes;
}

module.exports.categoryResearchController = categoryResearchController;
