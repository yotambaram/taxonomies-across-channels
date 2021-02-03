const Worker = require("../models/Worker");
const { csvReader } = require("./csv-reader");
const { csvWriter } = require("./csv-workers-writer");
const pathWorkersDb = "./db/category-workers-db.csv";
const { fileBuilder } = require("./file-builder");
const { statusChecker } = require("./status-checker");

async function workerDbBuilder(newWorkersArr) {

  let headers = Object.keys(newWorkersArr[0]);

  try {

    // get db, if its not exist, make new file
    let categoryWorkersDB = await csvReader(pathWorkersDb); //dont realy need to read

    if (categoryWorkersDB) {
      let write = await csvWriter(newWorkersArr, pathWorkersDb, headers);
      return write;
    }
    else {
      let headers = Object.keys(newWorkersArr[0]);
      await fileBuilder(pathWorkersDb, headers);
      let write = await csvWriter(newWorkersArr, pathWorkersDb, headers);
      return write;
    }
  } catch {
    console.log("ERROR workerDbBuilder");
  }
}

module.exports.workerDbBuilder = workerDbBuilder;
