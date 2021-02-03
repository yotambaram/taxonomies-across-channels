
const fs = require("fs");

const fileBuilder = (path, headers) => {
  console.log(path)
    console.log("fsdfsdfsdfsdfsd")
  return fs.writeFile(path, headers + "\r\n", (err) => {
    if (err) throw err;
  });
};


module.exports.fileBuilder = fileBuilder;