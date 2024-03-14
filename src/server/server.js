const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "host"
})

/* app.get('/login', (req, res) => {
  const sql = 'SELECT * FROM login';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error")
    }
    return res.json(data);
  })
}) */

app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login WHERE loginid = ? AND pw = ?';

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json("err");
    if (data.length > 0) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  })
})

app.listen(8081, () => {
  console.log('App Listening on port 8081');
  db.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log('Database connected!');
  })
})