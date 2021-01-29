const csvFilePath='<path to csv file>'
const csv = require('csvtojson');
const fs = require("fs");
const headers = ["requestId", "browseNodeId", "numberOfResultAskedFor", "aid"];


async function csvReader(path) {
  console.log(path)
  
  try {
    if (fs.existsSync(path)) {
      console.log("path exists")
    return csv()
    .fromFile(path)
    } else {
      console.log("path NOT exists")
      return fs.writeFile(path,  headers, function (err) {
        if (err) throw err;
      });

    }
  } catch (err) {
    console.log("Erorr csvReader");
    console.log(err);
    
  }
};

module.exports.csvReader = csvReader;
