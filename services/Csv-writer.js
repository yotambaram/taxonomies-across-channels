var fs = require('fs');
var json2csv = require('json2csv').parse;
var newLine = '\r\n';


/*
json2csv
*/

const csvWriter = (data, filePath, fields) => {
  try {



fs.stat('./db/worker-list.csv', function (err, stat) {
  if (err == null) {
    console.log('File exists');

    //write the actual data and end with newline
    var csv = json2csv(data, { header: false }) + newLine;
    var csv2 = json2csv(data, { header: true }) + newLine;

    fs.appendFile('./db/worker-list.csv', csv, function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  } else {
    //write the headers and newline
    console.log('New file, just writing headers');
    fields = fields + newLine;

    fs.writeFile('./db/worker-list.csv', fields, function (err) {
      
      if (err) throw err;
      console.log('file saved');
    }).then( ()=> {});  
   
  }
});
  } catch (err) {
    console.log("Erorr identificationApiClient");
    console.log(err);
  }
  return true;
};

module.exports.csvWriter = csvWriter;
