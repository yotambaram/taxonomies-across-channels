const {csvWriter} = require("./csv-workers-writer")
const {csvReader} = require("./csv-reader")


async function statusChecker(jobsStatusObj) {
  console.log("STATUS CHECKER")
    let requestIdsArr = Object.keys(jobsStatusObj)
    let haveWorkToDo = true;
    
    requestIdsArr.forEach( job => {
      
      jobRequestProcces = jobsStatusObj[job].ProgressStatus === "DONE" && jobsStatusObj[job].jobResultsReadyForFetch === false ? false : true;
      //if no more jobs to do
      if (jobRequestProcces === false) {
        
       // let db = await csvReader("../db/category-workers-db.csv")
       haveWorkToDo = false
        console.log(`Request: ${job} finished process. need to move next and delete from here`)
        //update dbWorker status
      }
    });
    return haveWorkToDo
  }

  module.exports.statusChecker = statusChecker;