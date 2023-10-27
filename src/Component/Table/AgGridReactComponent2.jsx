import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AgGridReactComponent.css";
import { Rows } from "./RowData";

const data = require("../../ProfitLossStatement_55.json");
const jsonData = data.map((item) => item.profit_loss_statement);
const companyId = jsonData.map((item) => item.company_type);
const calendarYears = jsonData.map((item) => item.calendar_year);

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
  const generateColumns = () => {
    const dynamicColumns = calendarYears.map((year) => ({
      headerName: year.toString(),
      columnGroupShow: "open",
      marryChildren: true,
      children: [
        { columnGroupShow: "closed" },
        {
          headerName: "Q1 Revenue",
          field: `Q1Revenue${year}`,
          type: "number",
          columnGroupShow: "open",
        },
        {
          headerName: "Q2 Revenue",
          field: `Q2Revenue${year}`,
          type: "number",
          columnGroupShow: "open",
        },
        {
          headerName: "Q3 Revenue",
          field: `Q3Revenue${year}`,
          type: "number",
          columnGroupShow: "open",
        },
        {
          headerName: "Q4 Revenue",
          field: `Q4Revenue${year}`,
          type: "number",
          columnGroupShow: "open",
        },
      ],
    }));

    const headerData = dynamicColumns.map((column, index) => ({
      headerName: calendarYears[index],
      children: column.children,
    }));

    return [
      {
        headerName: companyId[0],
        field: `Revenue_type`,
      },
      ...headerData,
    ];
  };

  const columns = useMemo(() => generateColumns(), calendarYears);

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
  console.log(Rows);
  function getMergedRowsByIndices(dataRows, indices) {
    const selectedRows = indices.map((index) => dataRows[index]);
    return mergeArrayOfObjects(...selectedRows);
  }
  const requiredRowsIndices =
    (Rows.children, Array.from({ length: Rows.length }, (_, i) => i));
  const mergedRows = getMergedRowsByIndices(Rows, requiredRowsIndices);
  // const mergedRows = Rows.map((row) => ({
  //   ...row,
  //   ...getMergedRowsByIndices(
  //     row.children,
  //     Array.from({ length: row.children.length }, (_, i) => i)
  //   ),
  // }));

  if (!Rows || Rows.length === 0) {
    return <div>Loading...</div>;
  }

  console.log(mergedRows);

  return (
    <div className="ag-content">
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={mergedRows}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          animateRows={true}
          enableSorting={true}
          enableFilter={true}
          pagination={true}
          rowSelection="multiple"
          groupSelectsChildren={true}
          suppressAggFuncInHeader={true}
        />
      </div>
    </div>
  );
}

export default AgGridReactComponent;
