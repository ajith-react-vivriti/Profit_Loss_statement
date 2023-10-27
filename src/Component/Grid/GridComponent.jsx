import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

import { Rows } from "../AgComponent/RowData"; // Assuming the structure provided earlier for Rows

function AgGridReactComponentt() {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleCellClicked = (params) => {
    const { node } = params;
    if (node.group) {
      if (node.expanded) {
        setExpandedRows(
          expandedRows.filter((row) => row !== node.data.Revenue_type)
        );
      } else {
        setExpandedRows([...expandedRows, node.data.Revenue_type]);
      }
    }
  };

  const frameworkComponents = {};

  const detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        // Define your child row column definitions here
        { field: "Q1Revenue2023" },
        { field: "Q2Revenue2023" },
        { field: "Q3Revenue2023" },
        { field: "Q4Revenue2023" },
      ],
      defaultColDef: { flex: 1 },
      getRowNodeId: (data) => data.Revenue_type,
      onFirstDataRendered: (params) => params.api.sizeColumnsToFit(),
    },
    getDetailRowData: (params) => params.data.children,
  };

  const generateColumns = () => {
    // Your existing column generation logic
  };

  const columns = useMemo(() => generateColumns(), [Rows]);

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

  const getMergedRowsByIndices = (rows, indices) => {
    return rows.filter((row, index) => indices.includes(index));
  };

  const requiredRowsIndices = Array.from({ length: Rows.length }, (_, i) => i);
  const mergedRows = getMergedRowsByIndices(Rows, requiredRowsIndices);

  if (!Rows || Rows.length === 0) {
    return <div>Loading...</div>;
  }

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
          onCellClicked={handleCellClicked}
          frameworkComponents={frameworkComponents}
          masterDetail={true}
          groupDefaultExpanded={-1}
          suppressRowClickSelection={true}
          suppressCellSelection={true}
          detailCellRendererParams={detailCellRendererParams}
        />
      </div>
    </div>
  );
}

export default AgGridReactComponentt;
