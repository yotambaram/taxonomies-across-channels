const { forEach } = require("lodash");
const {
  categoryResearchController,
} = require("../controllers/category-research-controller");
const Worker = require("../models/Worker");
const { csvReader } = require("./csv-reader");
const { csvWriter } = require("./csv-workers-writer");
const pathWorkersDb = './db/category-workers-db.csv'



async function workerDbBuilder(newWorkersArr) {

  // get db, if its not exist, make new file
  let workersDB = await csvReader(pathWorkersDb)

  try {
    // Check if cotegory worker DB not empty.
    if (workersDB) {
      console.log("workersDB",workersDB)
      //for (let key of workersMap.keys()) {
        // If reqeust id is NOT exsits, add request id and data to DB, and update status
        //if(!workersDB.has(key)){
          // // Get the headers
          // let headers = 
          // // Get the data at the right data structure
          // workersMap.get(key)
          // // Write to workers DB
          // csvWriter(newRequestsFilteredList, pathWorkersDb, headers);
  //      } 
  //    }
    } 
    // If empty write it to worker DB
    else {
      console.log("NOOOOO")
      // dbStructure = []
      let keys = Object.keys(newWorkersArr[0])
      let csvReady = await csvWriter(
        newWorkersArr,
        pathWorkersDb,
        keys
      )
      
      console.log("csvReady",csvReady)
         
        
           
        
      }
      
      //let headers = Object.keys(workersMap);
      //await csvWriter(workersMap, pathWorkersDb); // csvWriter = (data, filePath, fields)
    }

  catch {
    console.log("ERROR workerDbBuilder");
  }

  //return ProductsArr
}

module.exports.workerDbBuilder = workerDbBuilder;
