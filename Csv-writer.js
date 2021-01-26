const fs = require("fs");
const json2csv = require("json2csv");
const { Parser } = json2csv;

const csvWriter = (dataRes) => {
  console.log("TTTTT" + dataRes)
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(dataRes);
    fs.writeFile("data.csv", csv, function (err) {
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
