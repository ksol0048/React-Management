import React, { useState, useEffect, useMemo } from 'react';
import './About.css';
import AboutDialog from './components/About_Dialog';
import AboutTable from './components/About_Table';
import DetailHeader from '../../components/DetailHeader';
import { aboutSelectedRow, aboutCheckedRowList } from './states/data_atoms';
import { useRecoilState } from 'recoil';
import { fetchFormattedData } from '../../functions/sql_service';
// var dbQueries = require('../../server/server');

function About() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useRecoilState(aboutCheckedRowList);
  const [selectAll, setSelectAll] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [activeRow, setActiveRow] = useRecoilState(aboutSelectedRow);
  const isDeleteAvailable = Object.keys(selectedRows).length > 0;

  const isEditAvailable = activeRow.index !== -1;

  const columns = useMemo(
    () => [
      {
        Header: "Code",
        columns: [
          {
            Header: "x",
            accessor: "code",
          },
        ],
      },
      {
        Header: "Company",
        columns: [
          {
            Header: "x",
            accessor: "company",
          },
        ],
      },
      {
        Header: "Price",
        columns: [
          {
            Header: "x",
            accessor: "price",
          },
        ],
      },
      {
        Header: "chance",
        columns: [
          {
            Header: "x",
            accessor: "chance",
          },
        ],
      },
      {
        Header: "Change(%)",
        columns: [
          {
            Header: "x",
            accessor: "changePrecent",
          },
        ],
      },
      {
        Header: "등록일",
        columns: [
          {
            Header: "x",
            accessor: "start_date",
          },
        ],
      },

    ],
    []
  );

  const changeDateFormat = (res) => {
    const tempData = [...res];

    tempData.forEach((datum, i) => {
      tempData[i] = {
        ...datum,
        start_date: datum["start_date"]?.substring(0, 10),
      };
    });

    return tempData;
  };

  const onInit = () => {
    fetchFormattedData({
      from: "FROM tabledata",
      orderBy: "ORDER BY start_date DESC"
    }).then(res => {
      const tempData = [...changeDateFormat(res)];
      setData(tempData);
    })
    setActiveRow({ index: -1 });
    // Reset selected rows and select all state when navigating between pages
    setSelectedRows([]);
    setSelectAll({});
  };

  useEffect(() => {
    onInit();
  }, [setData, currentPage]);


  return (
    <section>
      <h1>Fixed Table header</h1>
      <DetailHeader
        title={"About"}
        isEditAvailable={isEditAvailable}
        isDeleteAvailable={isDeleteAvailable}
      >
        <AboutDialog
          callback1={onInit}
          callback2={onInit}
          activeRowData={activeRow}
        />
      </DetailHeader>
      <AboutTable data={data} columns={columns} rowSpanList={[]} />
    </section>
  );
}

export default About;
