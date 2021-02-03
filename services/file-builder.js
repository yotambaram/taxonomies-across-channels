
const fs = require("fs");

const fileBuilder = (path, headers) => {

  return fs.writeFile(path, headers + "\r\n", (err) => {
    if (err) throw err;
  });
};


module.exports.fileBuilder = fileBuilder;