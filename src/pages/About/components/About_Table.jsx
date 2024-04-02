import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { aboutSelectedRow, aboutCheckedRowList } from "../states/data_atoms";
import {
  useTable,
  usePagination,
  useRowSelect,
  useResizeColumns,
  useGlobalFilter,
} from "react-table";

// 체크박스 생성 함수
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

/**
 * 공정관리 - 설비 테이블
 * @param {array} columns - 컬럼들
 * @param {array} data - 컬럼 별 데이터
 * @param {array} rowSpanList - 병합해야할 COLUMN 이름 리스트
 */
function AboutTable({ columns, data, rowSpanList }) {
  
  // ROW 활성화 상태
  const [activeRow, setActiveRow] = useRecoilState(aboutSelectedRow);
  // 체크박스 활성화 상태
  const [, setCheckedRowList] = useRecoilState(aboutCheckedRowList);

  // 같은 값이 존재 할 때 셀 병합 ([rowSpanList : 병합해야할 COLUMN 이름 리스트] 존재시)
  let namesArr = {};
  let rowSpan = [];
  rowSpanList.forEach((rowKey, i) => {
    rowSpan[i] = data.reduce((result, item, key) => {
      if (namesArr[item[rowKey]] === undefined) {
        namesArr[item[rowKey]] = key;
        result[key] = 1;
      } else {
        const firstIndex = namesArr[item[rowKey]];
        if (
          firstIndex === key - 1 ||
          (item[rowKey] === data[key - 1][rowKey] && result[key - 1] === 0)
        ) {
          result[firstIndex]++;
          result[key] = 0;
        } else {
          result[key] = 1;
          namesArr[item[rowKey]] = key;
        }
      }
      return result;
    }, []);
  });

  // react-table에서 제공하는 properties
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useResizeColumns,
    (hooks) => {
      // Column 그리기
      hooks.visibleColumns.push((columns) => {
        const newColumns = [
          // 가지고 온 data에 없는 Column 만들기
          // ex) 체크박스, 인덱스
          {
            id: "selection",
            Header: "x",
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
            parent: {
              id: "selection",
              Header: ({ getToggleAllPageRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox
                    {...getToggleAllPageRowsSelectedProps()}
                  />
                </div>
              ),
            },
            columns: [{ Header: "x", accessor: "select_x" }],
          },
          ...columns,
        ];
        return newColumns;
      });
    }
  );

  useEffect(() => {
    // 체크된 리스트 저장
    setCheckedRowList(selectedRowIds);
  }, [selectedRowIds, setCheckedRowList]);

  return (
    <Styles>
      <SizedBox>
        <TableWrapper>
          <table {...getTableProps()}>
            <TableHeader>
              {headerGroups.map((headerGroup) => (
                <tr  {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    column.Header !== "x" && (
                      <th
                        key={column.id}
                        {...column.getHeaderProps()}
                        rowSpan={
                          column.originalId === "selection" ||
                            column.Header === "Code" ||
                            column.Header === "Company" ||
                            column.Header === "Price" ||
                            column.Header === "Change" ||
                            column.Header === "Change(%)" ||
                            column.Header === "등록일" ||
                            column.Header.toString().includes("emptyRenderer()")
                            ? 2
                            : 1
                        }
                      >
                        {column.render("Header")}
                      </th>
                    )
                  ))}
                </tr>
              ))}
            </TableHeader>
            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow
                    key={row.id}
                    {...row.getRowProps()}
                    onClick={() => {
                      setActiveRow({
                        index: row.index,
                        ...row.original,
                      });
                    }}
                    isActive={activeRow === null ? false : row.index === activeRow.index}
                  >
                    {row.cells.map((cell) => (
                      <td key={cell.id} {...cell.getCellProps()}>
                        {cell.value === "" ? "-" : cell.render("Cell")}
                      </td>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </table>
        </TableWrapper>
      </SizedBox>
      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span style={{ color: "white" }}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span style={{ color: "white" }}>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Styles>
  );
}

const TableRow = styled.tr`
  background-color: ${({ isActive }) => {
    return isActive ? "#1f44a3" : "transparent";
  }};
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Styles = styled.div`
  padding: 10px 0px;
  height: 65vh;
  width: 100%;
  
  table {
    table-layout: fixed;
    border: 1px solid #a3b1be;
    border-spacing: 1;
    white-space: nowrap;
    width: 100%;

    th {
      color: #fff;
      text-transform: uppercase;
      background: #666a78;
      margin: 0;
      padding: 0.5rem;
      border: 1px solid #a3b1be;
      font-weight: 700;
      font-size: 14px;
      line-height: 30px;
      vertical-align: middle;
      text-align: center;
    }
    td {
      color: #fff;
      border-bottom: solid 1px rgba(255, 255, 255, 0.1);
      padding: 0.5rem;
      border: 1px solid #a3b1be;
      font-weight: 400;
      font-size: 12px;
      line-height: 25px;
      text-align: center;
      vertical-align: middle;
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #a3b1be;
  overflow-x: auto;
`;

const TableHeader = styled.thead`
  tr {
    position: sticky;
    top: 0;
    z-index: 1; /* Ensure header stays on top */
  }
`;

const TableBody = styled.tbody`
  tr:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SizedBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #a3b1be;
  overflow-x: auto;
  overflow-y: auto; 

  ::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  ::-webkit-scrollbar:vertical {
    width: 11px;
  }

  ::-webkit-scrollbar:horizontal {
    height: 11px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white; /* should match background, can't be transparent */
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default AboutTable;
