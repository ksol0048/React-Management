const mysql = require('mysql');
const bluebird = require("bluebird");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "host",
  Promise: bluebird,
  dateStrings: 'date'
})

db.connect(function(err) {
    if(err) console.error('mysql connection error : ' + err);
    else console.log('mysql is connected successfully!');
});

module.exports = db;
