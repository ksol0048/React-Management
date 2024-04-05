import axios from "axios";

export {
  fetchData,
  fetchFormattedData,
  insertData,
  deleteData,
  deleteOriginData,
  getImQueryData,
  getQueryData,
  getWhere,
};

async function fetchData({ table = "", where = "", orderBy = "" } = {}) {
  var body = `SELECT * FROM ${table} ${where} ${orderBy}`;
  // var body = "SELECT * FROM item ORDER BY register_date DESC";
  try {
    const response = await axios.post(
      "http://localhost:8080/select",
      { query: body }
    );
    const datum = response.data;
    return datum.data;
  } catch (error) {
    return {};
  }
}

async function fetchFormattedData({
  what = "*",
  where = "",
  from = "",
  orderBy = "",
  limit = "",
  join = "",
} = {}) {
  var body = `SELECT ${what} ${from} ${join} ${where} ${orderBy} ${limit}`;
  // var body = "SELECT * FROM item ORDER BY register_date DESC";
  try {
    const response = await axios.post(
      "http://localhost:8080/select",
      { query: body }
    );
    const datum = response.data;
    return datum.data;
  } catch (error) {
    return {};
  }
}

async function insertData({ body = "" } = {}) {
  // var body = "SELECT * FROM item ORDER BY register_date DESC";
  try {
    const response = await axios.post(
      "http://localhost:8080/insert",
      { query: body }
    );
    const datum = response.data;
    return datum.data;
    // setImData(datum.data);
  } catch (error) {
    return {};
  }
}

async function deleteData({ body = "" } = {}) {
  //var body = `DELETE FROM item ${where}`;
  try {
    const response = await axios.post(
      "http://localhost:8080/insert",
      { query: body }
    );
    const datum = response.data;
    return datum.data;
  } catch (error) {
    return {};
  }
}

async function deleteOriginData({ from = "", where = "" } = {}) {
  var body = `DELETE ${from} ${where}`;

  try {
    const response = await axios.post(
      "http://localhost:8080//insert",
      { query: body }
    );
    const datum = response.data;
    return datum.data;
  } catch (error) {
    return {};
  }
}

function getImQueryData(res, qState) {
  var queryData = [];
  res.map((datum) => {
    if (datum["account"] === qState) {
      queryData.push(datum);
    }
  });
  return queryData;
}
function getQueryData(res, qStateList) {
  var queryData = [];

  res.map((datum) => {
    try {
      Object.keys(qStateList).forEach((value) => {
        if (!(datum[value] === qStateList[value]) && qStateList[value] !== "") {
          throw new Error("stop loop");
        }
      });
      queryData.push(datum);
    } catch (e) {}
  });

  return queryData;
}
function getWhere(qStateList, isFirst = true, table = "") {
  var where = "";
  var isRealFirst = isFirst === true ? true : false;

  Object.keys(qStateList).forEach((qState) => {
    if (qStateList[qState] !== undefined && qStateList[qState] !== "") {
      if (isRealFirst) {
        where += `WHERE ${table}${qState} = "${qStateList[qState]}" `;
        isRealFirst = false;
      } else {
        where += `AND ${table}${qState} = "${qStateList[qState]}" `;
      }
    }
  });

  return where;
}