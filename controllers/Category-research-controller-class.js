const { categoryResearchApi } = require("../api/category-research-api");
const { workerBuilder } = require("../services/worker-builder");


module.exports = class CategoryResearchController{
  categoryId;
  workers;
  campaniesIdsArr;
  FAKERequestIdsArr = [
    {
      requestId: "648180e7-d60a-4c1d-8d65-196c2fdfdda5",
      categoryId: 2975359011,
      numberOfResultAskFor: 2,
      ProgressStatus: 1,
    },
    {
      requestId: "bc79075b-cee8-4555-82e1-ad89ffd88d32d4",
      categoryId: 2975359011,
      numberOfResultAskFor: 5,
      ProgressStatus: 1,
    },
  ]
 
  constructor(campaniesIdsArr) {
    this.campaniesIdsArr = campaniesIdsArr
  }
  /* 1) Call API */
  async getApiCategortRequests() {
    this.campaniesIdsArr = await categoryResearchApi(categoryId);
  }
  /* 2) Write to category workers DB */
  //will check if exists and if not, will write to workers db
  async writeCategortRequestsToDB() {
    this.workers = await workerBuilder(FAKERequestIdsArr/*requestIdsArr*/,pathWorkersDb);
  }
  /* 3) Call Category get ready controller (with timeout) */    
}



