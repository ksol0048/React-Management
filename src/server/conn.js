const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "host"
})

db.connect(function(err) {
    if(err) console.error('mysql connection error : ' + err);
    else console.log('mysql is connected successfully!');
});

module.exports = db;
