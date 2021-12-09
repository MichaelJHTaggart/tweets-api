//Node.js File System Module url(https://nodejs.org/api/fs.html)
const fs = require('fs');

const path = require('path');
const FILE_PATH = path.join(__dirname, '../assets/pies4.json');

module.exports = {
  //resolve & reject are two callbacks(functions) that are passed to getPie4 function
  //Todo write 2 functions separated by a comma when calling getPie4 function

  getPie4: function (resolve, reject) {
    fs.readFile(FILE_PATH, 'utf-8', function (err, data) {
      if (err) {
        //invokes the reject callback
        reject(err);
      } else {
        //invokes the resolve callback
        // changes our json file to a javascript object
        resolve(JSON.parse(data));
      };
    });
  }
}

//? What will happen if resolve is invoked?
//* Whatever function that we write when we call getPie4 will have access to whatever the result of resolve is

//? What will happen if reject is invoked?
//* Whatever function that we write when we call getPie4 will have access to whatever the result of reject is