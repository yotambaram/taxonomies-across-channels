const {csvWriter} = require("./csv-workers-writer")
const {csvReader} = require("./csv-reader")


async function statusChecker(jobsStatusObj) {
    let requestIdsArr = Object.keys(jobsStatusObj)
    let haveWorkToDo = true;
    requestIdsArr.forEach( job => {
      
      jobRequestProcces = jobsStatusObj[job].ProgressStatus === "DONE" && jobsStatusObj[job].jobResultsReadyForFetch === false ? false : true;
      console.log(job, jobRequestProcces)
      if (jobRequestProcces === false) {
       // let db = await csvReader("../db/category-workers-db.csv")
       
        console.log(`Request: ${job} finished process. need to move next and delete from here`)
        //update dbWorker status
      }
    });
    return haveWorkToDo
  }

  module.exports.statusChecker = statusChecker;