const express =require('express');
const router = express.Router();
const db =require('../conn');

/* router.get('/', (req, res) => {
  res.send('Root');
}); */

router.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error")
    }
    return res.json(data);
  })
})

/* router.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login WHERE loginid = ? AND pw = ?';

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      return res.json("err");
    }
    if (data.length > 0) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  })
}) */

router.get('/tabledata', (req, res) => {
  const sql = 'SELECT * FROM tabledata';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error")
    }
    return res.json(data);
  })
})

module.exports =router;