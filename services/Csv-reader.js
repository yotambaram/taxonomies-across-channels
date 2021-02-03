
const csv = require("csvtojson");
const fs = require("fs");


async function csvReader(path) {
  try {
    if (fs.existsSync(path)) {
      return csv().fromFile(path);
    } else {
      return false
    }
    
  } catch (err) {
    console.log("Erorr csvReader");
    console.log(err);
  }
}

module.exports.csvReader = csvReader;



// async function csvReader(path) {
//   console.log("csvReader" + path)
//   try {
//     if (fs.existsSync(path)) {
//     return csv()
//     .fromFile(path)
//     } else {
//       console.log("path NOT exists")
//       return fs.writeFile(path, headers, err => {
//         if (err) throw err;
//       });

//     }
//   } catch(err) {
//     console.log("Erorr csvReader");
//     console.log(err);

//   }
// };

// module.exports.csvReader = csvReader;
