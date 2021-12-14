const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '../assets/pies4.json');

module.exports = {
 getPie5: function (id, resolve, reject) {
  fs.readFile(FILE_PATH, function (err, data) {
   if (err) {
    reject(err);
   } else {
    let pie = JSON.parse(data).find(pie => pie.id == id);
    resolve(pie)
   };
  });
 }
}