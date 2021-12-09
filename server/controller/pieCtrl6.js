const fs = require('fs');

const path = require('path');
const FILE_PATH = path.join(__dirname, '../assets/pies4.json');

module.exports = {
  getPie6: function (searchObject, resolve, reject) {
    fs.readFile(FILE_PATH, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        //Perform search
        if (searchObject) {
          pies = pies.filter(
            p => (searchObject.id ? p.id == searchObject.id : true) && (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true)
          )
        }
      }
    });
  }
}