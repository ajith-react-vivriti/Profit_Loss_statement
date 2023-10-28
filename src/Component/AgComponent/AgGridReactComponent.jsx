import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AgGridReactComponent.css";
import { Rows } from "./RowData";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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

const Customkey = (p) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const Revenue_Value = isClicked ? p.value : "";

  if (Revenue_Value !== "") {
    // const index1 = Rows.includes(Revenue_Value);
    const index1 = Rows[0].findIndex((row) => row === Revenue_Value);
    const roww = Rows[0].slice(index1 + 1, 0, p.data.children);
    console.log("Rows after:", roww);
  }

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {isClicked ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      {p.value}
    </div>
  );
};
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
        cellRenderer: Customkey,
        // cellRendererParams: { onClick: dataTransfer },
        // cellRendererSelector: (params) => {
        //   if (params.value === "Total Revenue") {
        //     return { component: "Customkey" };
        //   }
        //   return null;
        // },
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
  // console.log(mergedRows);
  console.log(childrenRow);
  let i = 0;
  // for (let i = 0; childrenRow.length > i; i++) {
  if (Array.isArray(childrenRow[i]) && childrenRow[i].length > 0) {
    var childrenRowValue = childrenRow[i];
    console.log(childrenRowValue.length);

    mergedRows.splice(childrenRowValue.length - 1, 0, ...childrenRowValue);
    console.log(mergedRows);

    // console.log(k + 1);
    // for (let j = 0; j < childrenRow[i].length; j++) {
    //   i++;
    // }

    // }
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
