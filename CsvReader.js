const csvFilePath='<path to csv file>'
const csv=require('csvtojson')
const fs = require("fs");

async function csvReader() {
  try {  
    return csv()
    .fromFile("data.csv")
  } catch (err) {
    console.log("Erorr csvReader");
    console.log(err);
  }
};

module.exports.csvReader = csvReader;
