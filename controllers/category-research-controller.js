const { categoryResearchApiProcessor } = require("../api/category-research-api-processor");
const { workerDbBuilder } = require("../services/worker-db-builder");
let whileLoopDevCounter = 1;


async function categoryResearchController(categortRequesrIdInputArr) {
    try {

    /* 1) Call API*/
    //let workersArrRes = await categoryResearchApiProcessor(categortRequesrIdInputArr);
  
    let FAKEworkersArrRes = [
  {
    categoryRequestID: 'df78a1ef-02d0-4699-97a0-9a837770ca04',
    categoryId: 6358540011,
    processStatus: true
  },
  {
    categoryRequestID: 'cdb4bf09-60bb-437c-991a-0e12ed5fd11e',
    categoryId: 6358540011,
    processStatus: true
  }
]
    /* 2)  Check if exists and if not, write to db */
    let workers = await workerDbBuilder(FAKEworkersArrRes);
    return FAKEworkersArrRes;
  } catch (err) {
    console.log("Error runProcess - category research controller");
    console.log("Error runProcess" + err);
  }
}

module.exports.categoryResearchController = categoryResearchController;
