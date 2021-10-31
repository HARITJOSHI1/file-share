const fs = require('fs');
const path = require('path');
exports.saveFileToDisk = async (filename, file) => {
  fs.open(path.join(__dirname, `../docs/${filename}`), "a", function (err, fd) {
    // If the output file does not exists
    // an error is thrown else data in the
    // buffer is written to the output file
    if (err) {
      console.log("Cant open file -1");
    } else {
      fs.write(
        fd,
        file.buffer,
        0,
        file.buffer.length,
        null,
        function (err, writtenbytes) {
          if (err) {
            console.log("Cant write to file -2");
          } else {
            console.log(writtenbytes + " characters added to file");
          }
        }
      );
    }
  });
};
