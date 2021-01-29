const {
  CategoryGetReadyResultsApi,
} = require("../api/category-research-ready-api-request");

const { productBuilder } = require("../services/product-builder");
const { categoryDbCreator } = require("../services/db-creator")
//if exist: update DB by add aid to array



async function categoryResearchGetRead() {
  let ready = false;
  
  const pathWorkers = "../../db/worker-list.csv";
  const query =
    "https://api.algopix.com/v3/category/analysisAsync/getReadyResults";

 
 // let categoryDB = await csvReader(pathDb);

 //   try {
      /* Call API*/
      const allApiCallResults = await CategoryGetReadyResultsApi(query);
      apiDataResut = allApiCallResults[0].data
      
      //cases when to stop
      let statusCode = apiDataResut.statusCode
      let test = apiDataResut.statusCode
      let jobsStatus = Object.keys(apiDataResut.asyncApiStatus.jobsStatus).length
      //let jobsStatusREQUESTID = Object.keys(apiDataResut.asyncApiStatus.jobsStatus.REQUESTID.ProgressStatus/jobResultsReadyForFetch
      let jobsProcessing = apiDataResut.asyncApiStatus.jobsProcessing
      let howManyResults = apiDataResut.result.length
      let whileCounter = 1;
      //console.log("jobsProcessing", jobsProcessing, "thereAreResults", howManyResults, "jobsStatus", jobsStatus)
     // While there are result, put the result and keep calling the api
     
      while(jobsProcessing && whileCounter <= 2 || howManyResults > 0 && whileCounter <= 2 || whileCounter <= 2) {
       
        
        // Build new Item
      const producsArr = await productBuilder(apiDataResut, pathWorkers)
       //save the item to DB
       let addToDb = categoryDbCreator(producsArr)







       // then call the readyresult api again
       if  (jobsStatus === 0 && jobsProcessing === true) {
        // time out and then call
      }
      if  (jobsStatus === 0 && jobsProcessing === true) {
        // time out and then call
      }
      if (howManyResults < 1) {
        // time out and then call
      }

       //console.log(whileCounter, addToDb)
       //firstRequestId = await CategoryGetReadyResultsApi(query);
       whileCounter++

     }
     
            
  
  //         //return categoryDB;
  //       } else {
  //         // Check if current request id exists in DB
  //         //console.log("TEST",allApiCallResults[0].data.result[0].requestId)
  //         let currentRequestId = allApiCallResults[0].data.result[0].requestId;
  //         let index = -1;
  //         for (let i = 0; i < categoryDB.length; i++) {
  //           if (currentRequestId === categoryDB[i].requestId) {
  //             index = i;
  //             break;
  //           }
  //         }
  //         // If exsits, Update, else Create new line
  //         index > -1
  //           ? (categoryDB = await updateLine(
  //               index,
  //               allApiCallResults,
  //               categoryDB
  //             ))
  //           : (categoryDB = await createLine(
  //               allApiCallResults,
  //               categoryDB,
  //               pathWorkers
  //             ));
  //       }
       
  //       let currentJobsStatus = allApiCallResults[0].data.asyncApiStatus;
  //       //   //   //If there are no jobs
  //       //     !currentJobsStatus
  //       //       ? /* remove requestId from queue */ (newDataExample.localFetched = true)
  //       //      : "";
  //       let ProgressingDone = currentJobsStatus.ProgressStatus === "DONE";
  //       let fetchDone = currentJobsStatus.jobResultsReadyForFetch === true;
  //       //If list\queue is not empty, keep progress. alse, stop working here
  //       console.log("One should be TRUE: ",(!ProgressingDone), (ProgressingDone && fetchDone));
  //       (!ProgressingDone && devCounter < 150) ||
  //       (ProgressingDone && fetchDone && devCounter < 150)
  //         ? getReadHelper(categoryDB)
  //         : ready = await csvWriter(
  //             categoryDB,
  //             pathDb
  //           ); /* +remove it from worker-list */

  //     } else {
        
  //       ready = await csvWriter
  //         return ready
        

  //     }
       
      



          
          
  //   } catch (err) {
  //     console.log("Error runProcess" + err);
  //   }
    
    
    
  // }
  
  // let dataPrited = await (getReadHelper(categoryDB))
  // console.log("Fsdfsdfsd",dataPrited)
  return
}

module.exports.categoryResearchGetRead = categoryResearchGetRead;
