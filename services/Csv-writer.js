const fs = require("fs");
const json2csv = require("json2csv");
const { Parser } = json2csv;


const csvWriter = (dataRes, path) => {
  console.log(path)
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(dataRes);
    console.log(csv)
    fs.writeFile(path, csv, function (err) {
      if (err) throw err;
      console.log("File Saved!");
    });
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
  return true;
};

module.exports.csvWriter = csvWriter;
