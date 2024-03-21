import React, { useState, useEffect } from 'react';
import './About.css';
// var dbQueries = require('../../server/server');

function About() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const data = [
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    { code: 'AAC', company: 'AUSTRALIAN COMPANY', price: '$1.38', change: '+2.01', changePercent: '-0.36%' },
    { code: 'AAD', company: 'AUSENCO', price: '$2.38', change: '-0.01', changePercent: '-1.36%' },
    
  ];
  
  

 /*  // Example query
  const query = 'SELECT * FROM tabledata';

  // Execute the query
  dbQueries.executeQuery(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    // Log the results to the console
    console.log('Query results:', results);
  }); */

  // const db = require('../../server/server');

  // 예시: 특정 테이블에서 데이터 조회하기

  // 데이터베이스 쿼리 직접 실행하기
  /* db.query(`SELECT * FROM tabledata`, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('Query results:', results);
  }); */

  useEffect(() => {
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
                  <td>{row.changePercent}</td>
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
