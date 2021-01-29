const { csvWriter } = require("./csv-writer");

// const updateDbProduct = (index, allApiCallResults, categoryDB) => {
//   let apiResult = allApiCallResults[0].data.result;
//   // Update DB resultAid

//   let newItemsArr = [];

//   let dbResultAidArr = JSON.parse(categoryDB[index].resultAid);

//   //console.log("dbResultAidArr",dbResultAidArr)
//   // Put new aid results in array
//   for (let i = 0; i < apiResult.length; i++) {
//     newItemsArr.push(apiResult[i].result.aid);
//   }
//   // Merge old array with New array

//   let concatArr = dbResultAidArr.concat(newItemsArr);
//   //console.log("concatArr", concatArr);
//   categoryDB[index].resultAid = JSON.stringify(concatArr);

//   //console.log("updateLine",categoryDB)
//   return categoryDB;
//   //write the update to DB
// };

async function dbCreator(productsArr, pathDb) {
  //console.log("DATA TEST:", productsArr);
  let headers = Object.keys(productsArr[0]);
  productsArr.forEach((dataObj) => {
    //console.log("Creating line");
    csvWriter(dataObj, pathDb, headers);
  });

  return true;
}

module.exports.dbCreator = dbCreator;
