// Input Category IDs
// Running all 20K Amazon categories through the Category Research API
// Get ASIN numbers
// Run all ASINs in the Product Analysis API with requests for offers form other compenies.
// Get result

const { getReadyResults } = require("./GetreadyApiCalll");

require("dotenv").config();
// Using for .env file to add API ID and KEY.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function runProcess() {
  let counter = 1
  try {
    const allApiCallResults = await getReadyResults();
    for (let i = 0; i < allApiCallResults.length; i++) {
      let ApiCallResults = allApiCallResults[i].data.result
      for (let j = 0; j < ApiCallResults.length; j++) {   
        console.log(counter + ") " + ApiCallResults[j].result.title)
        counter++
      }

      
      
      
    }
        
  } catch (err) {
    console.log("Error runProcess" + err);
  }
} 

runProcess();
