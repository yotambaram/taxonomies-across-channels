
const Item = require("../models/Item")
const {csvReader} = require("./Csv-reader")


async function NewItemBuilder(allApiCallResults, path) {
    let workersDB = await csvReader(path)
   console.log("workersDB",workersDB[0]["id"])
    let responeRequestId = allApiCallResults[0].data.result[0].requestId;
    let browseNodeId;
    let numberOfResultAskedFor;
    for(let i = 0; i < workersDB.length; i++) {
      if(workersDB[i].requestId === responeRequestId) {
        browseNodeId = workersDB[i].id;
        console.log("GDFGDFGDFGDFG",browseNodeId)
        numberOfResultAskedFor = workersDB[i].numberOfResultAskFor;
      }
    }
    // Build the class
    let newItem = new Item(responeRequestId, browseNodeId, numberOfResultAskedFor)
    for (let i = 0; i < allApiCallResults[0].data.result.length; i++) {     
      newItem.pushToResult(allApiCallResults[0].data.result[i].result.aid)
    }
    console.log(newItem)
    return newItem
  }


  module.exports.NewItemBuilder = NewItemBuilder