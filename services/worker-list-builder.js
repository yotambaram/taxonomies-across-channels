const fs = require("fs");
const json2csv = require("json2csv");
const Fields = require("../models/OutputFields");
const { Parser } = json2csv;

const workersList = (dataRes) => {
  for (let i = 0; i < dataRes.length; i++) {
    if (dataRes[i].data.statusCode > 299) {
      throw "Error csvWriter (API REQUEST)" + err;
    } else {
      writeCSV(i, dataRes);
    }
  }
  
};

const writeCSV = (index, dataRes) => {
  let stringifyData = dataRes[index].data.result.products;
  const json2csvParser = new Parser({
    fields: Fields.Fields,
    defaultValue: "",
    includeEmptyRows: true,
  });

  const csv = json2csvParser.parse(stringifyData);
  fs.writeFile("data.csv", csv, function (err) {
    // ### Change output path and file name here: ###
    if (err) throw err;
    console.log("File Saved!");
  });
}

module.exports.csvWriter = csvWriter;
