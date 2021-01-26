const fs = require("fs");
const json2csv = require('json2csv').parse;
const { Parser } = require('json2csv');
const newLine = '\r\n';

const csvWriterTwo = (dataRes) => {
  console.log("typeof dataRes: " +typeof dataRes)
  console.log(dataRes.requestId)
  //console.log("TTTTT" + JSON.stringify(dataRes))
  let path = dataRes.requestId + ".csv"
  console.log("TEST  "+path)
  try {
    ///////////////////

    let fields = ["requestId","browseNodeId","numberOfResultAskedFor","resultAid"]
  
    
    
    var toCsv = {
      data: dataRes,
      fields: fields,
      header: false,
    };
    
    fs.stat('file.csv', function (err, stat) {
      if (err == null) {
        console.log('File exists');
    
        //write the actual data and end with newline
        var csv = json2csv(toCsv) + newLine;
    
        fs.appendFile('file.csv', csv, function (err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
      } else {
          const json2csvParser = new Parser();
        const csv = json2csvParser.parse(dataRes);
        fs.writeFile(path, csv, function (err) {
          if (err) throw err;
          console.log("File Saved!");
        });
    
        }
      })
    /////////////////
      //file exists
    // } else {
    //   const json2csvParser = new Parser();
    // const csv = json2csvParser.parse(dataRes);
    // fs.writeFile(path, csv, function (err) {
    //   if (err) throw err;
    //   console.log("File Saved!");
    // });

    // }
    
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
  return true;
};

module.exports.csvWriterTwo = csvWriterTwo;
