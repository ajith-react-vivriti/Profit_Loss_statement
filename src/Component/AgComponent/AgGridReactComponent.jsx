import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AgGridReactComponent.css";
import { Rows } from "./RowData";
import generateColumn from "./ColumnsData";
const data = require("../../ProfitLossStatement_55.json");
const jsonData = data.map((item) => item.profit_loss_statement);
const calendarYears = jsonData.map((item) => item.calendar_year);
console.log(Rows);
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
  console.log(mergedRows);
  console.log(childrenRow);

  for (let i = 0; childrenRow.length > i; i++) {
    if (Array.isArray(childrenRow[i]) && childrenRow[i].length > 0) {
      let childrenRowValue = childrenRow[i];

      let childrenRwLgth = 0;
      for (let j = 0; i >= j; j++) {
        childrenRowValue = childrenRow[j];
        childrenRwLgth = i + childrenRowValue.length;
      }
      console.log(childrenRwLgth);
      mergedRows.splice(childrenRwLgth - 1, 0, ...childrenRowValue);
    }
  }

  console.log(mergedRows);

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
