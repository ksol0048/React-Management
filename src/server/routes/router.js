const express = require('express');
const router = express.Router();
const db = require('../conn');

const standardHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST",
};
/* router.get('/', (req, res) => {
  res.send('Root');
}); */

/* router.get('/tabledata', (req, res) => {
  const sql = 'SELECT * FROM tabledata WHERE start_date = "2024-03-29"';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error")
    }
    return res.json(data);
  })
}) */
/* router.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error")
    }
    return res.json(data);
  })
}) */

/* router.post('/inserttabledata', (req, res) => {
  const code = req.body.code;
  const company = req.body.company;
  const price = req.body.price;
  const change = req.body.change;
  const changePrecent = req.body.changePrecent;
  const start_date = req.body.start_date;

  const sql = `INSERT INTO tabledata (code, company, price, \`change\`, changePrecent, start_date)
VALUES ('${code}', '${company}', '${price}', '${change}', '${changePrecent}', '${start_date}')`; //change는 mysql 예약키워드라서 \`change\`로 감싸서 사용

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    return res.json(data);
  })
}) */

router.post("/select", (req, res) => {
  try {
    db.query(req.body["query"], (err, result) => {
      if (err) {
      } else {
        res.status(201).json({ status: 201, data: result });
      }
    });
    res.header(standardHeader);
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});
router.post("/insert", (req, res) => {
  try {
    db.query(req.body["query"], (err, result) => {
      if (err) {
      } else {
        res.status(201).json({ status: 201, data: result });
      }
    });
    res.header(standardHeader);
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

/* router.post('/tabledata', (req, res) => {
  const sql = 'SELECT * FROM tabledata';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error")
    }
    return res.json(data);
  })
}) */

module.exports = router;