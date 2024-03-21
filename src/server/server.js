const express = require("express");
const app = express();
const db =require('./conn');
const cors = require("cors");
const router = require("./routes/router");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(8080, () => {
  console.log('App Listening on port 8080');
})