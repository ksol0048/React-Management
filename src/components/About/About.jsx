import React, { useState, useEffect } from 'react';
import './About.css';
import axios from 'axios';
// var dbQueries = require('../../server/server');

function About() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8080/tabledata')
      .then(res => {
        setData(res.data);
      })
    // Reset selected rows and select all state when navigating between pages
    setSelectedRows([]);
    setSelectAll(false);
  }, [currentPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    }
    setSelectAll(false); // Uncheck select all when individual checkbox is clicked
  };

  const handleSelectAll = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, data.length);
    const pageRange = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);

    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(pageRange);
    }
    setSelectAll((prev) => !prev);
  };

  const handleButtonClick = () => {
    console.log(selectedRows.map((index) => data[index]));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);

  return (
    <section>
      <h1>Fixed Table header</h1>
      <button className='selectrow' onClick={handleButtonClick} disabled={selectedRows.length === 0}>
        Log Selected Rows
      </button>
      <div className='tbl-container'>
        <div className="tbl-header">
          <table>
            <thead>
              <tr>
                <th><input type='checkbox' id='checkAll' checked={selectAll} onChange={handleSelectAll} /></th>
                <th>Code</th>
                <th>Company</th>
                <th>Price</th>
                <th>Change</th>
                <th>Change %</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table>
            <tbody>
              {data.slice(startIndex, endIndex).map((row, index) => (
                <tr key={index}>
                  <td><input type='checkbox' checked={selectedRows.includes(startIndex + index)} onChange={() => handleCheckboxChange(startIndex + index)} /></td>
                  <td>{row.code}</td>
                  <td>{row.company}</td>
                  <td>{row.price}</td>
                  <td>{row.change}</td>
                  <td>{row.changePrecent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="tbl-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          ◁ Prev
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next ▷
        </button>
        <span style={{ color: 'white', marginLeft: '15px' }}>Page {currentPage} of {totalPages}</span>
        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </section>
  );
}

export default About;
