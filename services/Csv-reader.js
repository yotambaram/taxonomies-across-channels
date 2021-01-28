const csvFilePath='<path to csv file>'
const csv = require('csvtojson');
const fs = require("fs");
const headers = ["requestId", "browseNodeId", "numberOfResultAskedFor", "aid"];

async function csvReader(path) {
  try {
    if (fs.existsSync(path)) {
    return csv()
    .fromFile(path)
    


    } else {
      return fs.writeFile(path,  headers, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    }
  } catch (err) {
    console.log("Erorr csvReader");
    console.log(err);
    
  }
};

module.exports.csvReader = csvReader;
