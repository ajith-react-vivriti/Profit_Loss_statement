import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AgGridReactComponent.css";
import { Rows } from "./RowData";
import generateColumn from "./ColumnsData";
const data = require("../../ProfitLossStatement_55.json");
const jsonData = data.map((item) => item.profit_loss_statement);
const calendarYears = jsonData.map((item) => item.calendar_year);
// console.log(Rows);
function mergeArrayOfObjects(...arrays) {
  const maxLength = Math.max(...arrays.map((arr) => arr.length));
  const mergedArray = [];

  for (let i = 0; i < maxLength; i++) {
    let mergedObject = {};
    arrays.forEach((arr) => {
      if (i < arr.length) {
        Object.assign(mergedObject, arr[i]);
      }
    });
    mergedArray.push(mergedObject);
  }
  return mergedArray;
}
function AgGridReactComponent() {
  const [storedPId, setStoredPId] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const storedData = parseInt(localStorage.getItem("P_id"));
      setStoredPId(storedData);
    };
    fetchData();
  }, []);
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      maxWidth: 300,
      resizable: true,
      sortable: true,
    }),
    []
  );
  const columns = useMemo(() => generateColumn, calendarYears);

  function getMergedRowsByIndices(dataRows, indices) {
    const selectedRows = indices.map((index) => dataRows[index]);
    return mergeArrayOfObjects(...selectedRows);
  }
  const requiredRowsIndices =
    (Rows.children, Array.from({ length: Rows.length }, (_, i) => i));
  const mergedRows = getMergedRowsByIndices(Rows, requiredRowsIndices);

  if (!Rows || Rows.length === 0) {
    return <div>Loading...</div>;
  }
  const childrenRow = mergedRows.map((item) => item.children);
  let i = storedPId || "";

  if (Array.isArray(childrenRow[i]) && childrenRow[i].length > 0) {
    switch (Number(i)) {
      case 1:
        let childrenRowValue1 = childrenRow[0];
        console.log(childrenRow[0]);
        mergedRows.splice(1, 0, ...childrenRowValue1);
        break;
      case 2:
        let childrenRowValue2 = childrenRow[1];
        console.log("ghjjj", childrenRow[1]);
        mergedRows.splice(2, 0, ...childrenRowValue2);
        break;
      default:
        break;
    }
  }
  return (
    <div className="ag-content">
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={mergedRows}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          isExpandable={true}
          masterDetail={true}
          animateRows={true}
          enableSorting={true}
          enableFilter={true}
          pagination={true}
          rowSelection="multiple"
          groupSelectsChildren={true}
          // groupDefaultExpanded={-1}
          suppressAggFuncInHeader={true}
        />
      </div>
    </div>
  );
}

export default AgGridReactComponent;
